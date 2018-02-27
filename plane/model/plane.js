/**
 * @author   : zhy
 * @date     : 20171108
 */

/**
 * @constructor
 * @param {object} options 
 */
var Plane = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("plane").entity;
    me.width = 128 * dataBus.scale;
    me.height = 165 * dataBus.scale;
    me.sWidth = 128;
    me.sHeight = 165;
    me.bulletType = 1;
    me.speed = 3;
    me.hp = 1;
    me.name = "plane";
    me.bombs = 0;
    me.lastAnimation = Date.now();
    me.explodeAnimationTotal = 5;
    me.firedTime = 0;
    me.bombTime = 0;
    me.addEventListener("collision", function (evt) {
        if (evt.target instanceof AEnemy) {
            if (me.hp > 0) {
                --me.hp;
                if (me.hp === 0) {
                    me.sPosition.y = me.sHeight * 2;
                }
            }
        }
        else if (evt.target instanceof DoubleLaser) {
            dataBus.sound.play("getdoublelaser");
            if (me.bulletType === 1) {
                me.bulletType = 2;
            }
            else {
                me.bulletType = 1;
            }
            dataBus.remove(evt.target);
        }
        else if (evt.target instanceof Bomb) {
            if (me.bombs < 9) {
                dataBus.sound.play("getbomb");
                me.bombs++;
                dataBus.remove(evt.target);
            }
        }
    });
};

Plane.prototype = Object.create(AModel.prototype);


Plane.prototype.fire = function () {
    var me = this;
    if ((Date.now() - me.firedTime) < 0.2 * 1000) return [];
    me.firedTime = Date.now();

    if (me.bulletType === 1) {
        var p = me.getCenter();
        p.y = me.position.y;
        var b = new Bullet1({ position: p, owner: me });
        b.position.x -= b.width / 2;
        return [b];
    }

    var b1 = new Bullet2({ position: { x: me.position.x, y: me.position.y + me.height / 2 }, owner: me });
    var b2 = new Bullet2({ position: { x: me.position.x + me.width, y: me.position.y + me.height / 2 }, owner: me });

    b1.position.x -= b1.width / 2;
    b2.position.x -= b2.width / 2;

    return [b1, b2];
};

Plane.prototype.dropBomb = function () {
    var me = this;
    if ((Date.now() - me.bombTime) < 0.2 * 1000 || me.bombs === 0) return;
    me.dispatchEvent("dropBomb", { target: me });
    dataBus.sound.play("usebomb");
    me.bombs--;
    me.bombTime = Date.now();
};

/**
 * @override
 */
Plane.prototype.onFrame = function (evt) {
    var me = this;
    if (me.hp > 0) {
        me.normalAnimation();
    }
    if (me.hp === 0) {
        me.explodeAnimation();
    }
    AModel.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Plane.prototype.normalAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.5 * 1000) {
        if (me.sPosition.y === 0) {
            me.sPosition.y = me.sHeight;
        }
        else {
            me.sPosition.y = 0;
        }
        me.lastAnimation = Date.now();
    }
};

Plane.prototype.explodeAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.1 * 1000) {

        if (me.sPosition.y === 2 * me.sHeight) dataBus.sound.play("gameover");

        if (me.sPosition.y === me.explodeAnimationTotal * me.sHeight) {
            me.onExplode();
            return;
        }
        me.sPosition.y += me.sHeight;
        me.lastAnimation = Date.now();
    }
};

Plane.prototype.onExplode = function () {
    var me = this;
    me.dispatchEvent("explode");
};