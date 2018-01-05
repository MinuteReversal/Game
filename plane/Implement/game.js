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
    me.isPause = true;
    me.isDrawBox = true;
    me.keyboard = null;
    me.mouse = null;
    me.sound = null;
    me.resource = null;
    me.player1 = null;
    me.player2 = null;
    me.list = [];
    me.resources = null;
    me.canvas = me.createCanvas(options.width, options.height);
    me.context = me.canvas.getContext("2d");

    if (options) {
        if (options.keyboard) me.keyboard = options.keyboard;
        if (options.mouse) me.mouse = options.mouse;
        if (options.map) me.map = options.map;
        if (options.sound) me.sound = options.sound;
        if (options.resource) me.resource = options.resource;
    }

    me.resource.addEventListener("complete", function (evt) {
        console.log("load complete");
        me.changeMap(options.map);
        me.addPlayer1();
        me.sound.play(me.resource.get("bgm").binary.slice(), true);
        me.loop();
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
                me.predicate(timeStamp);
                me.draw(timeStamp);
            } catch (ex) {
                me.isPause = true;
                alert("frame:" + ex.message);
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
        me.list.push(e);
    }
};

Game.prototype.draw = function () {
    var me = this;
    var now = Date.now;
    for (var i = 0, item; item = me.list[i]; i++) {
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
 * 判定逻辑
 */
Game.prototype.predicate = function () {
    var me = this;
    var removeList = [];

    for (var i = 0, item; item = me.list[i]; i++) {
        if (!item.getBox) continue;

        var o = me.getCollision(item);
        var box = item.getBox();


        // 敌人中弹
        if (item instanceof Enemy1) {
            if (o instanceof Bullet1 || o instanceof Bullet2) {
                removeList.push(o);
                removeList.push(item);
            }
            else if (o === me.player1) {
                me.isPause = true;
            }
            else if (box.leftTop.y > 1136) {
                removeList.push(item);
            }
        }
        else if (item instanceof Bullet1 || item instanceof Bullet2) {
            if (box.leftTop.y < 0) {
                removeList.push(item);
            }
        }
    }

    for (var j = 0, item; item = removeList[j]; j++) {
        var index = me.list.indexOf(item);
        if (index > -1) {
            me.list.splice(index, 1);
        }
    }
};

Game.prototype.changeMap = function (map) {
    var me = this;
    me.list = [];
    me.addObject(map.background);
};

Game.prototype.addObject = function (model) {
    var me = this;
    me.list.push(model);
};

Game.prototype.removeObject = function (model) {
    var me = this;
    var index = me.list.indexOf(model);
    me.list.splice(index, 1);
};

Game.prototype.addPlayer1 = function () {
    var me = this;
    var plane = new Plane({ position: { x: 320, y: 600, sound: me.sound } });
    plane.addEventListener("fire", function (evt) {
        me.sound.play(me.resource.get("bullet").binary.slice());
    });
    me.player1 = plane;
    me.addObject(me.player1);
};

Game.prototype.getCollision = function (o) {
    var me = this;
    for (var i = 0, item; item = me.list[i]; i++) {
        if (item instanceof Background) continue;
        if (item === o) continue;
        if (me.isEgdeCollision(item, o)) return item;
    }
    return null;
};

Game.prototype.isEgdeCollision = function (rect1, rect2) {
    if (rect1.position.x < rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.height &&
        rect1.height + rect1.position.y > rect2.position.y) {
        return true;
    } else {
        return false;
    }
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
        if (kbd.KeyJ) me.list = me.list.concat(player1.fire());
    }
};
