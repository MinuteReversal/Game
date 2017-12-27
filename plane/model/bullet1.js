/**
 * @author:zhy
 * @date:20171108
 */
var Bullet1 = function (options) {
    AModel.call(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition.x = 1200 - 13;
    me.speed = 10;
};

Bullet1.prototype = Object.create(AModel.prototype);

Bullet1.prototype.onFrame = function (time) {
    var me = this;
    me.position.y -= me.speed;
};