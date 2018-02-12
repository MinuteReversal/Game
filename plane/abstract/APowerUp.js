var APowerUp = function () {
    AModel.apply(this, arguments);
    this.statues = "showdown";
};

APowerUp.prototype = Object.create(AModel.prototype);

APowerUp.prototype.playAnimation = function () {
    if (this.status === "showdown" && this.status === "showup") {
        this.showAnimation();
    }
    else {
        this.downAnimation();
    }
};

APowerUp.prototype.showAnimation = function () {
    if (this.status === "showdown") {
        this.position++;
        if (this.position.y > this.height * 3) {
            this.status = "showup";
        }
    }
    else if (this.statues === "showup") {
        this.position--;
        if (this.position.y + this.height < 0) {
            this.status = "down";
        }
    }
};

APowerUp.prototype.downAnimation = function () {
    this.position.y += 10;
};