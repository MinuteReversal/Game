/**
 * @author:zhy
 * @date:20171108
 */

var Enemy2 = function (options) {
    AEnemy.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 90 * dataBus.scale;
    me.height = 115 * dataBus.scale;
    me.sWidth = 90;
    me.sHeight = 115;
    me.sPosition.x = 834;
    me.rotate = 180;
    me.speed = 3;
    me.name = "Enemy2";
    me.hp = 3;
    me.explodeAnimationTotal = 3;
    me.lastAnimation = 0;//timestamp

    me.addEventListener("collision", function (evt) {
        if (evt.target instanceof ABullet) {
            if (me.hp > 0) {
                --me.hp;
                if (me.hp === 0) dataBus.sound.play("enemy3down");
            }
        }
    });
};

Enemy2.prototype = Object.create(AEnemy.prototype);

/**
 * @override
 * @param {number} time 
 */
Enemy2.prototype.onFrame = function (time) {
    var me = this;

    if (me.hp > 0) {
        me.position.y += me.speed;
    }

    if (me.position.y > 1136) {
        dataBus.remove(me);
    }

    if (me.hp === 2) {
        me.damageAnimation();
    }

    if (me.hp === 0) {
        me.explodeAnimation();
    }

    AEnemy.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Enemy2.prototype.damageAnimation = function () {
    var me = this;
    me.sPosition.y = me.sHeight;
};

Enemy2.prototype.explodeAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.1 * 1000) {
        if (me.sPosition.y === me.explodeAnimationTotal * me.sHeight) {
            me.onExplode();
            return;
        }
        me.sPosition.y += me.sHeight;
        me.lastAnimation = Date.now();
    }
};

Enemy2.prototype.onExplode = function () {
    var me = this;
    me.dispatchEvent("explode");
    dataBus.remove(me);
};