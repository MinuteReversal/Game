var ABullet = function () {
    AModel.apply(this, arguments);
    var me = this;

    dataBus.sound.play("bullet");
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
    me.addEventListener("collision", function (evt) { me.onCollision(evt); });
};

ABullet.prototype = Object.create(AModel.prototype);

ABullet.prototype.onFrame = function (evt) {
    var me = this;
    me.position.y -= me.speed;
    AModel.prototype.onFrame.apply(this, arguments);

    if (me.position.y + me.height < 0) {
        dataBus.remove(me);
    }
};

ABullet.prototype.onCollision = function (evt) {
    var me = this;
    if (me.owner !== evt.target && evt.target instanceof AEnemy) {
        var enemy = evt.target;
        if (enemy.hp > 0 && dataBus.removeList.indexOf(me) === -1) {
            enemy.hp--;
            dataBus.remove(me);
        }
    }
};