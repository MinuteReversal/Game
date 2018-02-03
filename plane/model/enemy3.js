/**
 * @author:zhy
 * @date:20171108
 */

var Enemy3 = function (options) {
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
    me.name = "Enemy3";
    me.hp = 5;
    me.explodeAnimationTotal = 5;
    me.normalAnimationTotal = 1;
    me.lastAnimation = 0;//timestamp

    me.addEventListener("collision", function (evt) {
        if (evt.target instanceof ABullet) {
            if (me.hp > 0)--me.hp;
            if (me.hp === 0) dataBus.sound.play("enemy3down");
        }
    });
};

Enemy3.prototype = Object.create(AEnemy.prototype);

/**
 * @override
 * @param {number} time 
 */
Enemy3.prototype.onFrame = function (time) {
    var me = this;

    if (me.hp > 0) {
        me.position.y += me.speed;
    }

    if (me.position.y > 1136) {
        dataBus.remove(me);
    }

    if (me.hp > 3) {
        me.normalAnimation();
    }
    else if (me.hp === 3) {
        me.damageAnimation();
    }

    if (me.hp === 0) {
        me.explodeAnimation();
    }

    AEnemy.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Enemy3.prototype.normalAnimation = function () {
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

Enemy3.prototype.damageAnimation = function () {
    me.sPosition.y = me.sHeight * 3;
};

Enemy3.prototype.explodeAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.1 * 1000) {
        if (me.sPosition.x === me.explodeAnimationTotal * me.sWidth) {
            me.onExplode();
            return;
        }
        me.sPosition.x += me.sWidth;
        me.lastAnimation = Date.now();
    }
};

Enemy3.prototype.onExplode = function () {
    var me = this;
    me.dispatchEvent("explode");
    dataBus.remove(me);
};