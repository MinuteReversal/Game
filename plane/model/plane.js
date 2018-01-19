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
    me.image = dataBus.resource.get("bg").entity;
    me.width = 128 * dataBus.scale;
    me.height = 162 * dataBus.scale;
    me.sWidth = 128
    me.sHeight = 162;
    me.sPosition.x = 640;
    me.bulletType = 1;
    me.speed = 3;
    me.status = "fine";
    me.name = "plane";
    me.lastAnimation = Date.now();
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
    me.addEventListener("collision",function(evt){
        if(evt.target instanceof AEnemy){
            me.dispatchEvent("explode");
            me.status="explode";
        }
    });
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
    if (me.status === "fine") {
        me.normalAnimation();
    }
    AModel.prototype.onFrame.apply(this, arguments);//call base onFrame
};

Plane.prototype.normalAnimation = function () {
    var me = this;
    if (Date.now() - me.lastAnimation > 0.5 * 1000) {
        if (me.sPosition.y === 0) {
            me.sPosition.y = me.sHeight;
        }
        else {
            me.sPosition.y = 0;
        }
        me.lastAnimation = Date.now();
    }
};

Plane.prototype.destroyAnimation = function () {
    var me = this;
};