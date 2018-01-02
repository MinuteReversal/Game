/**
 * @author : zhy
 * @date   : 20171108
 * @file Background.js
 */

var Background = function () {
    AModel.apply(this, arguments);
    var me = this;
    me.width = 640;
    me.height = 1136;
    me.sWidth = me.width
    me.sHeight = me.height;
};

Background.prototype=Object.create(AModel.prototype);

var background = new Background();