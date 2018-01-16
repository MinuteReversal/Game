/**
 * @author   : zhy
 * @datetime : 20171108
 * @file     : game.js
 * @link     : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
 */

/**
 * @constructor
 * @param {object} options
 */
var Game = function (options) {
    var me = this;
    me.isPause = false;
    me.isDrawBox = false;
    me.showFps = true;
    me.keyboard = null;
    me.mouse = null;
    me.touch = null;
    me.sound = dataBus.sound;
    me.resource = dataBus.resource;
    me.player1 = null;
    me.player2 = null;
    me.resources = null;
    me.canvas = me.createCanvas(options.width, options.height);
    me.context = me.canvas.getContext("2d");
    me.map = new Level1({ width: options.width, height: options.height });
    me.width = options.width;
    me.height = options.height;
    me.lastTime = Date.now();
    me.frameCount = 0;
    me.fps = 0;
    me.score = 0;
    me.scoreList = [];

    dataBus.scale = me.width / 1136 < 0.5 ? 0.5 : me.width / 1136;

    if (options) {
        if (options.keyboard) me.keyboard = options.keyboard;
        if (options.mouse) me.mouse = options.mouse;
        if (options.touch) me.touch = options.touch;
    }

    var fn = function () {
        me.start();
        me.canvas.removeEventListener("click", fn);
        me.canvas.removeEventListener("touchstart", fn);
    };
    me.canvas.addEventListener("click", fn);
    me.canvas.addEventListener("touchstart", fn);

    me.resource.addEventListener("complete", function (evt) {
        me.touchToStart();
    });
    me.resource.loadAll();
};

Game.prototype.touchToStart = function () {
    var me = this;
    var f = new Face();
    f.width = me.width;
    f.height = me.width / 640 * 1136;

    var btn = new Button();
    btn.width = me.width / 4;
    btn.height = 20 / 80 * me.width / 4;
    btn.text = "开始游戏";

    btn.position.x = (me.width - btn.width) / 2;
    btn.position.y = (me.height - btn.height - me.height / 20);

    dataBus.add(f);
    dataBus.add(btn);
    me.draw();
};

Game.prototype.start = function () {
    var me = this;
    try {
        dataBus.list = [];
        me.addBackground();
        me.addScore();
        me.addPlayer1();
        me.sound.play(me.resource.get("bgm").entity, true);
        me.loop();
    }
    catch (ex) {
        alert(ex.message);
    }
};

Game.prototype.createCanvas = function (width, height) {
    var me = this;
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
};

Game.prototype.loop = function () {
    var me = this;
    var fn = function (timeStamp) {

        if (me.keyboard.Enter) {
            me.isPause = !me.isPause;
        }

        if (!me.isPause) {
            me.generateEnermy(timeStamp);
            me.keyboardWatch(timeStamp);
            me.touchWatch(timeStamp);
            me.update(timeStamp);
            me.draw(timeStamp);
        }

        if (me.isPause && !me.sound.isPause) me.sound.pause();
        if (!me.isPause && me.sound.isPause) me.sound.continue();

        requestAnimationFrame(fn);
    }
    requestAnimationFrame(fn);
};

Game.prototype.generateEnermy = function (timeStamp) {
    var me = this;
    var e = me.map.generate(timeStamp);
    if (e) {
        e.addEventListener("collision", function (evt) {
            me.score++;
        });
        dataBus.add(e);
    }
};

Game.prototype.draw = function () {
    var me = this;
    var now = Date.now();
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        if (item.onFrame) {
            item.onFrame({ target: me });
        }

        if (typeof item.getCenter === "undefined") continue;

        var center = item.getCenter();
        me.context.save();
        me.context.translate(center.x, center.y);
        me.context.rotate(item.rotate * Math.PI / 180);
        me.context.translate(-item.width / 2, -item.height / 2);
        me.context.drawImage(
            item.image,
            item.sPosition.x,
            item.sPosition.y,
            item.sWidth,
            item.sHeight,
            0,
            0,
            item.width,
            item.height
        );
        me.context.restore();

        if (me.isDrawBox && !(item instanceof Background)) {
            me.context.save();
            me.context.strokeStyle = "red";
            me.context.strokeRect(item.position.x, item.position.y, item.width, item.height);
            me.context.fillText(item.position.x + "," + item.position.y, item.position.x, item.position.y);
            me.context.restore();
        }
        if (item.onAfterFrame) {
            item.onAfterFrame({ target: me });
        }
    }

    me.drawScore();

    if (me.showFps) {
        if (now - me.lastTime >= 1000) {
            me.fps = me.frameCount;
            me.lastTime = now;
            me.frameCount = 0;
        }
        ++me.frameCount;
        me.context.save();
        me.context.strokeStyle = "black";
        me.context.fillText("FPS:" + me.fps, 20, me.height - 20);
        me.context.restore();
    }


};

Game.prototype.drawScore = function () {
    var me = this;
    var num = me.score;
    var i = 0;
    var j = 0;
    if (me.scoreList.length) {
        while (num > 0) {
            i = num % 10;
            me.scoreList[j].number = i;
            num = parseInt(num / 10);
            j++;
        }
    }
};

/**
 * 每帧
 */
Game.prototype.update = function (timeStamp) {
    var me = this;
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        item.dispatchEvent("frame", { target: me, timeStamp: timeStamp });
    }
    dataBus.execRemove();
};

Game.prototype.addBackground = function () {
    var me = this;
    var bg1 = new Background({ windowWidth: me.width, windowHeight: me.height });
    var bg2 = new Background({ windowWidth: me.width, windowHeight: me.height });
    bg2.position.y = -bg2.height;

    dataBus.add(bg1);
    dataBus.add(bg2);
};

Game.prototype.addScore = function () {
    var me = this;
    for (var i = 5; i >= 0; i--) {
        var n = new NumberText();
        n.position.x = i * n.width;
        me.scoreList.push(n);
        dataBus.add(n);
    }
};

Game.prototype.addPlayer1 = function () {
    var me = this;
    var plane = new Plane({ scale: me.scale });
    plane.position.x = (me.canvas.width - plane.width) / 2;
    plane.position.y = me.canvas.height - plane.height;

    plane.addEventListener("collision", function (evt) {

    });
    me.player1 = plane;
    dataBus.add(me.player1);
};

Game.prototype.keyboardWatch = function () {
    var me = this;
    var kbd = me.keyboard;
    if (me.player1) {
        var player1 = me.player1;
        if (kbd.KeyW && player1.position.y > 0) player1.position.y -= player1.speed;
        if (kbd.KeyA && player1.position.x > 0) player1.position.x -= player1.speed;
        if (kbd.KeyS && player1.position.y + player1.height < me.height) player1.position.y += player1.speed;
        if (kbd.KeyD && player1.position.x + player1.width < me.width) player1.position.x += player1.speed;
        if (kbd.KeyJ) dataBus.list = dataBus.list.concat(player1.fire());
    }
};

Game.prototype.touchWatch = function () {
    var me = this;
    var player1 = me.player1;
    var touchPoint = me.touch.list[0];
    if (touchPoint && player1.inBox(touchPoint)) {
        player1.position.x = touchPoint.x - player1.width / 2;
        player1.position.y = touchPoint.y - player1.height / 2;
        dataBus.list = dataBus.list.concat(player1.fire());
    }
};
