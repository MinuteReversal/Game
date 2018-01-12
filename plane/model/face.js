var Face = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("face").entity;
    me.width = 640;
    me.height = 1136;
    me.sWidth = 640
    me.sHeight = 1136;
};
Face.prototype = Object.create(AModel.prototype);