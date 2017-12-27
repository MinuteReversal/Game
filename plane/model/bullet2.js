/**
 * @author:zhy
 * @date:20171108
 */
var Bullet2 = function (options) {
    AModel.call(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sPosition = {
        x: 1200 - 13,
        y: me.height
    };
    me.speed = 10;
};

Bullet2.prototype = Object.create(AModel.prototype);

Bullet2.prototype.onFrame = function (time) {
    var me = this;
    me.position.y -= me.speed;
};