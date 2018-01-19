var Dialog = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("common").entity;
    me.width = 200;
    me.height = 200;
    me.sWidth = 200
    me.sHeight = 200;
};
Dialog.prototype = Object.create(AModel.prototype);