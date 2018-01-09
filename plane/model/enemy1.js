/**
 * @author:zhy
 * @date:20171108
 */

var Enemy1 = function (options) {
    AEnemy.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 63;
    me.height = 50;
    me.sWidth = me.width;
    me.sHeight = me.height;
    me.sPosition.x = 640 + 128;
    me.rotate = 180;
    me.speed = 3;
    me.name = "enemy1";
    me.status = "fine";
    me.explodeAnimationTotal = 3;
    me.lastAnimation = 0;

    me.addEventListener("collision", function (evt) {
        if (me.status === "fine") {
            //dataBus.sound.play(dataBus.resource.get("enemy1down").binary.slice());
            me.status = "explode";
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

    if (me.status === "fine") {
        me.position.y += me.speed;
    }

    if (me.position.y > 1136) {
        dataBus.remove(me);
    }


    if (me.status === "explode") {
        me.explodeAnimation();
    }

    AEnemy.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Enemy1.prototype.explodeAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.1 * 1000) {
        if (me.sPosition.y === me.explodeAnimationTotal * me.height) {
            me.onExplode();
            return;
        }
        me.sPosition.y += me.height;
        me.lastAnimation = Date.now();
    }
};

Enemy1.prototype.onExplode = function () {
    var me = this;
    dataBus.remove(me);
};