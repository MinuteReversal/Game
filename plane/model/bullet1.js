/**
 * @author:zhy
 * @date:20171108
 */
var Bullet1 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bullet1").entity;
    me.width = 13 * dataBus.scale;
    me.height = 28 * dataBus.scale;
    me.sWidth = 13
    me.sHeight = 28;
    me.speed = 10;
    me.name = "Bullet1";
};

Bullet1.prototype = Object.create(ABullet.prototype);