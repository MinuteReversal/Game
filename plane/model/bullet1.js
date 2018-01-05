/**
 * @author:zhy
 * @date:20171108
 */
var Bullet1 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition.x = 1200 - 13;
    me.speed = 10;

    dataBus.sound.play(dataBus.resource.get("bullet").binary.slice());
};

Bullet1.prototype = Object.create(ABullet.prototype);

Bullet1.prototype.onFrame = function (time) {
    var me = this;
    me.position.y -= me.speed;
};