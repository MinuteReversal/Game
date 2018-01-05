/**
 * @author:zhy
 * @date:20171108
 */
var Bullet2 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition = {
        x: 1200 - 13,
        y: me.height
    };
    me.speed = 10;
    me.name = "Bullet2";

    dataBus.sound.play(dataBus.resource.get("bullet").binary.slice());
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
    me.addEventListener("collision", function (evt) { me.onCollision(evt); });
};

Bullet2.prototype = Object.create(ABullet.prototype);

Bullet2.prototype.onFrame = function (evt) {
    var me = this;
    me.position.y -= me.speed;
    if (me.position.y + me.height < 0) {
        dataBus.list.splice(dataBus.list.indexOf(me), 1)
    }
    var o = me.getCollision(me);
    if (o instanceof AEnemy) {
        me.onCollision();
        o.onCollision();
    }
};

Bullet2.prototype.onCollision = function (evt) {
    var me = this;
    dataBus.remove(me);
};
