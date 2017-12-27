/**
 * @author   : zhy
 * @date     : 20171108
 */

/**
 * @constructor
 * @param {object} options 
 */
var Plane = function (options) {
    AModel.call(this, arguments);
    var me = this;
    me.width = 128;
    me.height = 162;
    me.sPosition.x = 640;
    me.bulletType = 1;
    me.speed = 3;
};

Plane.prototype = Object.create(AModel.prototype);


Plane.prototype.fire = function () {
    var me = this;
    if ((Date.now() - me.firedTime) < 0.2 * 1000) return [];
    me.firedTime = Date.now();
    if (me.bulletType === 1) {
        var p = me.getCenter();
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