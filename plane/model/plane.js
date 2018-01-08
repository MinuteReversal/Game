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
    me.lastAnimation = Date.now();
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
};

Plane.prototype = Object.create(AModel.prototype);


Plane.prototype.fire = function () {
    var me = this;
    if ((Date.now() - me.firedTime) < 0.2 * 1000) return [];
    me.firedTime = Date.now();

    if (me.bulletType === 1) {
        var p = me.getCenter();
        p.y = me.position.y;
        var b = new Bullet1({ position: p, owner: me });
        b.position.x -= b.width / 2;
        return [b];
    }

    var b1 = new Bullet2({ position: { x: me.position.x, y: me.position.y + me.height / 2, owner: me } });
    var b2 = new Bullet2({ position: { x: me.position.x + me.width, y: me.position.y + me.height / 2, owner: me } });

    b1.position.x -= b1.width / 2;
    b2.position.x -= b2.width / 2;

    return [b1, b2];
};

/**
 * @override
 */
Plane.prototype.onFrame = function (evt) {
    var me = this;
    AModel.prototype.onFrame.apply(this, arguments);//Call base onFrame

    if (me.status === "fine") {
        me.normalAnimation();
    }
};

Plane.prototype.normalAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.5 * 1000) {
        if (me.sPosition.y === 0) {
            me.sPosition.y += me.height;
        }
        else {
            me.sPosition.y -= me.height;
        }
        me.lastAnimation = Date.now();
    }
};

Plane.prototype.destroyAnimation = function () {
    var me = this;

};