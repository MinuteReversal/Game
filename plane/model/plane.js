/**
 * @author:zhy
 * @date:20171108
 */

/**
 * @constructor
 * @param {object} options 
 */
var Plane = function (options) {
    var me = this;
    me.width = 128;
    me.height = 162;
    me.position = {
        x: 0,
        y: 0
    };
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition = {
        x: 640,
        y: 0
    };
    me.rotate = 0;
    me.bulletType = 1;
    me.speed = 3;
    if (options) {
        for (p in options) {
            me[p] = options[p];
        }
    }
};

Plane.prototype.getBox = function () {
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

Plane.prototype.getCenter = function () {
    var me = this;
    return {
        x: me.position.x + me.width / 2,
        y: me.position.y + me.height / 2,
    };
};

Plane.prototype.fire = function () {
    var me = this;
    if (me.bulletType === 1) {
        var p =  me.getCenter();
        p.y = me.position.y;
        return [new Bullet1({ position: p })];
    }
    return [
        new Bullet2({ position: { x: me.position.x, y: me.position.y + me.height / 2 } }),
        new Bullet2({ position: { x: me.position.x + me.width, y: me.position.y + me.height / 2 } })
    ];
};

Plane.prototype.destroy = function () {

};