/**
 * @author:zhy
 * @date:20171108
 */

var Enemy1 = function (options) {
    AEnemy.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 63 * dataBus.scale;
    me.height = 50 * dataBus.scale;
    me.sWidth = 63;
    me.sHeight = 50;
    me.sPosition.x = 640 + 128;
    me.rotate = 180;
    me.speed = 3;
    me.name = "Enemy1";
    me.hp = 1;
    me.explodeAnimationTotal = 4;
    me.lastAnimation = 0;

    me.addEventListener("collision", function (evt) {
        if (evt.target instanceof ABullet) {
            if (me.hp > 0) {
                --me.hp;
            }
        }
    });
};

Enemy1.prototype = Object.create(AEnemy.prototype);

/**
 * @override
 * @param {number} time 
 */
Enemy1.prototype.onFrame = function (time) {
    var me = this;

    if (me.hp > 0) {
        me.position.y += me.speed;
    }

    if (me.position.y > 1136) {
        dataBus.remove(me);
    }


    if (me.hp === 0) {
        me.explodeAnimation();
    }

    AEnemy.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Enemy1.prototype.explodeAnimation = function () {
    var me = this;
    if (me.sPosition.y === me.sHeight) {
        dataBus.sound.play("enemy1down");
    }
    if (Date.now() - me.lastAnimation > 0.1 * 1000) {
        if (me.sPosition.y === me.explodeAnimationTotal * me.sHeight) {
            me.onExplode();
            return;
        }
        me.sPosition.y += me.sHeight;
        me.lastAnimation = Date.now();
    }
};

Enemy1.prototype.onExplode = function () {
    var me = this;
    me.dispatchEvent("explode");
    dataBus.remove(me);
};