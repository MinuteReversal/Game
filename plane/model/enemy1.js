/**
 * @author:zhy
 * @date:20171108
 */

var Enemy1 = function (options) {
    var me = this;
    me.width = 63;
    me.height = 48;
    me.position = {
        x: 0,
        y: 0
    };
    me.sWidth = me.width;
    me.sHeight = me.height;
    me.sPosition = {
        x: 640 + 128,
        y: 0
    };
    me.rotate = 180;
    me.speed = 3;

    if (options) {
        for (p in options) {
            me[p] = options[p];
        }
    }
};

Enemy1.prototype.getBox = function () {
    var me = this;
    return {
        leftTop: me.position,
        rightTop: {
            x: me.position.x + me.width,
            y: me.position.y
        },
        rightBottom: {
            x: me.position.x + me.width,
            y: me.position.y + me.height
        },
        leftBottom: {
            x: me.position.x,
            y: me.position.y + me.height
        }
    };
};

Enemy1.prototype.getCenter = function () {
    var me = this;
    return {
        x: me.position.x + me.width / 2,
        y: me.position.y + me.height / 2,
    };
};

Enemy1.prototype.onFrame = function (time) {
    var me = this;
    me.position.y += me.speed;
};

Enemy1.prototype.destroy = function () {

};