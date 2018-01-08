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
    me.keyboard = null;
    me.mouse = null;
    me.touch = null;
    me.sound = dataBus.sound;
    me.resource = dataBus.resource;
    me.player1 = null;
    me.player2 = null;
    me.score = 0;
    me.resources = null;
    me.canvas = me.createCanvas(options.width, options.height);
    me.context = me.canvas.getContext("2d");

    if (options) {
        if (options.keyboard) me.keyboard = options.keyboard;
        if (options.mouse) me.mouse = options.mouse;
        if (options.touch) me.touch = options.touch;
        if (options.map) me.map = options.map;
    }

    me.resource.addEventListener("complete", function (evt) {
        try {
            me.changeMap(options.map);
            me.addPlayer1();
            //me.sound.play(me.resource.get("bgm").binary.slice(), true);
            me.loop();
        }
        catch (ex) {
            alert(ex.message);
        }
    });
    me.resource.loadAll();
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

            try {
                me.generateEnermy(timeStamp);
                me.keyboardWatch(timeStamp);
                me.mouseWatch(timeStamp);
                me.touchWatch(timeStamp);
                me.update(timeStamp);
                me.draw(timeStamp);
            }
            catch (ex) {
                me.isPause = true;
                alert(ex.message);
            }
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
        dataBus.add(e);
    }
};

Game.prototype.draw = function () {
    var me = this;
    var now = Date.now;
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        if (item.onFrame) {
            item.onFrame(now);
        }

        if (typeof item.getCenter === "undefined") continue;

        var center = item.getCenter();
        me.context.save();
        me.context.translate(center.x, center.y);
        me.context.rotate(item.rotate * Math.PI / 180);
        me.context.translate(-item.width / 2, -item.height / 2);
        me.context.drawImage(
            me.resource.get("bg").entity,
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
    }
};

/**
 * 每帧
 */
Game.prototype.update = function (timeStamp) {
    var me = this;
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        if (item instanceof Background) continue;
        item.dispatchEvent("frame", { target: me, timeStamp: timeStamp });
    }
    dataBus.execRemove();
};

Game.prototype.changeMap = function (map) {
    var me = this;
    dataBus.add(map.background);
};

Game.prototype.addPlayer1 = function () {
    var me = this;
    var plane = new Plane();
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
        if (kbd.KeyW) player1.position.y -= player1.speed;
        if (kbd.KeyA) player1.position.x -= player1.speed;
        if (kbd.KeyS) player1.position.y += player1.speed;
        if (kbd.KeyD) player1.position.x += player1.speed;
        if (kbd.KeyJ) dataBus.list = dataBus.list.concat(player1.fire());
    }
};

Game.prototype.touchWatch = function () {
    var me = this;
    if (me.touch.list.length) {
        var touchPoint = me.touch.list[0];
        var player1 = me.player1;
        player1.position.x = touchPoint.x - player1.width / 2;
        player1.position.y = touchPoint.y - player1.height / 2;
        dataBus.list = dataBus.list.concat(player1.fire());
    }
};

Game.prototype.mouseWatch = function () {
    var me = this;
    if (me.mouse.Left) {
    }
};
