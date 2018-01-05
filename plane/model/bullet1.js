/**
 * @author:zhy
 * @date:20171108
 */
var Bullet1 = function (options) {
    ABullet.apply(this, arguments);
    var me = this;
    me.width = 13;
    me.height = 28;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition.x = 1200 - 13;
    me.speed = 10;
    me.name = "Bullet1";

    dataBus.sound.play(dataBus.resource.get("bullet").binary.slice());
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
};

Bullet1.prototype = Object.create(ABullet.prototype);

Bullet1.prototype.onFrame = function (evt) {
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

Bullet1.prototype.onCollision = function (evt) {
    var me = this;
    dataBus.remove(me);
};