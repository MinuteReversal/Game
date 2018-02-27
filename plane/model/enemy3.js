/**
 * @author:zhy
 * @date:20171108
 */

var Enemy3 = function (options) {
    AEnemy.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("enemy3").entity;
    me.width = 218 * dataBus.scale;
    me.height = 330 * dataBus.scale;
    me.sWidth = 218;
    me.sHeight = 330;
    me.rotate = 180;
    me.speed = 3;
    me.name = "Enemy3";
    me.hp = 5;
    me.explodeAnimationTotal = 6;
    me.normalAnimationTotal = 1;
    me.lastAnimation = 0;//timestamp

    dataBus.sound.play("enemy2out");
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
    var me = this;
    me.sPosition.y = me.sHeight * 2;
};

Enemy3.prototype.explodeAnimation = function () {
    var me = this;
    if (me.sPosition.x === 0) {
        dataBus.sound.play("enemy2down");
        me.image = dataBus.resource.get("enemy3explode").entity;
        me.sPosition = {
            x: 0,
            y: 0
        };
    }

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