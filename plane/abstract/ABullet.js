var ABullet = function (owner) {
    AModel.apply(this, arguments);
    this.owner = owner;
}

ABullet.prototype = Object.create(AModel.prototype);

