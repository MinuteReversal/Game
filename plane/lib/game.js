/**
 * @author:zhy
 * @date:20171108
 * docs:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
 */

/**
 * @constructor
 * @param {object} options
 */
var Game = function (options) {
    var me = this;
    me.isPause = false;
    me.isDrawBox = true;
    me.player1 = null;
    me.player2 = null;
    me.list = [];
    me.resources = null;
    me.canvas = me.createCanvas(options.width, options.height);
    me.context = me.canvas.getContext("2d");

    me.listenerKeyDown();

    me.loadResources(options.resource).then(function (image) {
        me.resources = image;
        me.changeMap(options.map);
        me.addPlayer1();
        me.loop();
    });
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
    var fn = function () {
        if (!me.isPause) {
            me.predicate();
            me.draw();
        }
        requestAnimationFrame(fn);
    }
    requestAnimationFrame(fn);
};

Game.prototype.draw = function () {
    var me = this;
    var now = Date.now;
    for (var i = 0, item; item = me.list[i]; i++) {
        if (item.onFrame) {
            item.onFrame(now);
        }

        var center = item.getCenter();

        me.context.save();
        me.context.translate(center.x, center.y);
        me.context.rotate(item.rotate * Math.PI / 180);
        me.context.translate(-item.width / 2, -item.height / 2);
        me.context.drawImage(
            me.resources,
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

        if (item instanceof Enemy1) {
            // 敌人中弹
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
    for (var i = 0, item; i < map.plan.length; i++) {
        var item = map.plan[i];
        if (item.add) {
            if (item.time === 0) {
                me.addObject(item.add);
            }
            else {
                (function (item) {
                    setTimeout(function () {
                        me.addObject(item.add);
                    }, item.time);
                })(item);
            }
        }
        if (item.remove) {
            me.removeObject(item.remove);
        }
    }
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

Game.prototype.loadResources = function (resource) {
    var me = this;
    var image = new Image();
    var then = function () { };
    var p = {
        then: function (fn) {
            then = fn;
        },
        catch: function () { }
    };
    image.addEventListener("load", function () {
        then(this);
    });
    image.src = resource;
    return p;
};

Game.prototype.addPlayer1 = function () {
    var me = this;
    me.player1 = new Plane({ position: { x: 320, y: 600 } });
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

Game.prototype.listenerKeyDown = function () {
    var me = this;
    window.addEventListener("keydown", function (evt) {
        if (me.player1) {
            var player1 = me.player1;
            switch (evt.keyCode) {
                //w
                case 87:
                    player1.position.y -= player1.speed;
                    break;
                //a
                case 65:
                    player1.position.x -= player1.speed;
                    break;
                //s
                case 83:
                    player1.position.y += player1.speed;
                    break;
                //d
                case 68:
                    player1.position.x += player1.speed;
                    break;
                //f
                case 74:
                    me.list = me.list.concat(player1.fire());
                    break;
            }
        }
    });

    window.addEventListener("keyup", function (evt) {

    });

    window.addEventListener("touchdown", function (evt) {

    });
};
