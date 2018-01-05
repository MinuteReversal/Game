/**
 * @author:zhy
 * @date:20171108
 */

var Enemy1 = function (options) {
    AEnemy.apply(this, arguments);
    var me = this;
    me.width = 63;
    me.height = 48;
    me.sWidth = me.width;
    me.sHeight = me.height;
    me.sPosition.x = 640 + 128;
    me.rotate = 180;
    me.speed = 3;
    me.name = "enemy1";

    me.addEventListener("collision", function (evt) { me.onExplode(evt); });
};
Enemy1.prototype = Object.create(AEnemy.prototype);

Enemy1.prototype.onFrame = function (time) {
    var me = this;
    me.position.y += me.speed;
    if (me.position.y > 1136) {
        dataBus.remove(me);
    }

    var o = me.getCollision(me);
    if (o instanceof ABullet) {
        me.onCollision();
    }
};

Enemy1.prototype.onCollision = function () {
    var me = this;
    dataBus.sound.play(dataBus.resource.get("enemy1down").binary.slice());
    dataBus.remove(me);
};