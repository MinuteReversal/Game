/**
 * @author:zhy
 * @date:20171108
 */

var Background = function () {
    var me = this;
    me.width = 640;
    me.height = 1136;
    me.position = {
        x: 0,
        y: 0
    };
    me.sWidth = 640;
    me.sHeight = 1136;
    me.sPosition = {
        x: 0,
        y: 0
    };
};


Background.prototype.getCenter = function () {
    var me = this;
    return {
        x: me.position.x + me.width / 2,
        y: me.position.y + me.height / 2,
    };
};


var background = new Background();