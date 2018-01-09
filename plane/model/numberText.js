var NumberText = function () {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("number").entity;
    me.number = 0;
    me.width = 24;
    me.height = 30;
    me.sWidth = 40
    me.sHeight = 50;

    me.addEventListener("frame",function(evt){
        me.sPosition.x = me.sWidth * me.number;
    });
};

NumberText.prototype = Object.create(AModel.prototype);