/**
 * @author:zhy
 * @date:20180212
 */
var DoubleLaser = function () {
    APowerUp.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 73 * dataBus.scale;
    me.height = 114 * dataBus.scale;
    me.sWidth = 73;
    me.sHeight = 114;
    me.sPosition = {
        x: 1050,
        y: 1021
    };
};

DoubleLaser.prototype = Object.create(APowerUp.prototype);

DoubleLaser.prototype.onFrame = function () {
    APowerUp.prototype.playAnimation.apply(this, arguments);
};