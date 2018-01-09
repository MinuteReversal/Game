/**
 * @author:zhy
 * @date:20171108
 */
var Bullet1 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 13 * me.scale;
    me.height = 28 * me.scale;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition.x = 1200 - 13;
    me.speed = 10;
    me.name = "Bullet1";
};

Bullet1.prototype = Object.create(ABullet.prototype);