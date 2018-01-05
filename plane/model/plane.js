/**
 * @author   : zhy
 * @date     : 20171108
 */

/**
 * @constructor
 * @param {object} options 
 */
var Plane = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.width = 128;
    me.height = 162;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition.x = 640;
    me.bulletType = 1;
    me.speed = 3;
    me.status = "fine";
    me.name = "plane";

    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
    me.addEventListener("collision", function (evt) { me.onCollision(evt); });
};

Plane.prototype = Object.create(AModel.prototype);


Plane.prototype.fire = function () {
    var me = this;
    if ((Date.now() - me.firedTime) < 0.2 * 1000) return [];
    me.firedTime = Date.now();

    if (me.bulletType === 1) {
        var p = me.getCenter();
        p.y = me.position.y;
        return [new Bullet1({ position: p, owner: me })];
    }
    return [
        new Bullet2({ position: { x: me.position.x, y: me.position.y + me.height / 2, owner: me } }),
        new Bullet2({ position: { x: me.position.x + me.width, y: me.position.y + me.height / 2, owner: me } })
    ];
};

Plane.prototype.onFrame = function (evn) {
    var me = this;
    var o = me.getCollision(me);
    if (o && o instanceof AEnemy) {
        me.dispatchEvent("explode", { target: me });
    }
};

Plane.prototype.normalAnimation = function () {
    var me = this;

};

Plane.prototype.destroyAnimation = function () {
    var me = this;

};