var Cross = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 51 * dataBus.scale;
    me.height = 54 * dataBus.scale;
    me.sWidth = 51;
    me.sHeight = 54;
    me.sPosition = {
        x: 840,
        y: 1076
    };
};

Cross.prototype = Object.create(AModel.prototype);