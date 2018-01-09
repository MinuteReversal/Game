/**
 * @author : zhy
 * @date   : 20171108
 * @file Background.js
 */

var Background = function () {
    AModel.apply(this, arguments);
    var me = this;
    me.image = dataBus.resource.get("bg").entity;
    me.width = 640;
    me.height = 1136;
    me.sWidth = me.width
    me.sHeight = me.height;
    me.name = "Background";
    me.resize();
    me.addEventListener("frame", function (evt) { me.onFrame(evt); });
};

Background.prototype = Object.create(AModel.prototype);

Background.prototype.resize = function () {
    var me = this;
    var ratio = me.height / me.width;
    me.width = me.windowWidth;
    me.height = me.windowWidth * ratio;
};

Background.prototype.onFrame = function () {
    var me = this;
    me.position.y += 0.05;
    if (me.position.y >= me.windowHeight) {
        me.position.y = me.windowHeight - me.height - me.height;
    }
};