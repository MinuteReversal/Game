var Text = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("common").entity;
    me.width = 0;
    me.height = 0;
    me.sWidth = 1;
    me.sHeight = 1;
    me.sPosition = {
        x: 201,
        y: 201
    };
};
Text.prototype = Object.create(AModel.prototype);

Text.prototype.onAfterFrame = function (evt) {
    var me = this;
    var ctx = evt.target.context;
    ctx.save();
    ctx.font = me.fontSize + "px Arial";
    ctx.fillText(me.text, me.position.x , me.position.y);
    ctx.restore();
};