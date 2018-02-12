/**
 * @author:zhy
 * @date:20180212
 */
var Bomb = function () {
    APowerUp.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 76 * dataBus.scale;
    me.height = 136 * dataBus.scale;
    me.sWidth = 76;
    me.sHeight = 136;
    me.sPosition = {
        x: 1124,
        y: 1000
    };
};

Bomb.prototype = Object.create(APowerUp.prototype);

Bomb.prototype.onFrame = function () {
    APowerUp.prototype.playAnimation.apply(this, arguments);
};