var BombButton = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 82 * dataBus.scale;
    me.height = 68 * dataBus.scale;
    me.sWidth = 82;
    me.sHeight = 68;
    me.sPosition = {
        x: 698,
        y: 1066
    };
};

BombButton.prototype = Object.create(AModel.prototype);