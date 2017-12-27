/**
 * @author:zhy
 * @date:20171108
 */

var Enemy1 = function (options) {
    AModel.call(this, arguments);
    var me = this;
    me.width = 63;
    me.height = 48;
    me.sWidth = me.width;
    me.sHeight = me.height;
    me.sPosition.x = 640 + 128;
    me.rotate = 180;
    me.speed = 3;
};
Enemy1.prototype = Object.create(AModel.prototype);

Enemy1.prototype.onFrame = function (time) {
    var me = this;
    me.position.y += me.speed;
};

Enemy1.prototype.destroy = function () {

};