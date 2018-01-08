var ABullet = function () {
    AModel.apply(this, arguments);
    var me = this;

    dataBus.sound.play(dataBus.resource.get("bullet").binary.slice());
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
    me.addEventListener("collision", function (evt) { me.onCollision(evt); });
}

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
    if (me.owner !== evt.target) {
        dataBus.remove(me);
    }
};