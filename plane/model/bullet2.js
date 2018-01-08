/**
 * @author:zhy
 * @date:20171108
 */
var Bullet2 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition = {
        x: 1200 - 13,
        y: me.height
    };
    me.speed = 10;
    me.name = "Bullet2";
};

Bullet2.prototype = Object.create(ABullet.prototype);
