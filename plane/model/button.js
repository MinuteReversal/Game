var Button = function (options) {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("common").entity;
    me.width = 79;
    me.height = 20;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.sPosition = {
        x: 201,
        y: 0
    };
};
Button.prototype = Object.create(AModel.prototype);

Button.prototype.onAfterFrame = function (evt) {
    var me = this;
    var ctx = evt.target.context;
    var fontSize = me.height / 2;
    var wordwidth = me.text.length * fontSize;
    ctx.save();
    ctx.font = fontSize + "px Arial";
    ctx.fillText(me.text, me.position.x + (me.width - wordwidth) / 2, me.position.y + (me.height + fontSize/2) / 2);
    ctx.restore();
};