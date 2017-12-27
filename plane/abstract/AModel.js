/**
 * @author   : zhy
 * @datetime : 2017-12-27
 * @file AModel.js
 */

var AModel = function () {
    var me = this;
    AEventObject.call(me, arguments);
    me.width = 0;
    me.height = 0;
    me.position = {
        x: 0,
        y: 0
    };
    me.sWidth = 0;
    me.sHeight = 0;
    me.sPosition = {
        x: 0,
        y: 0
    };
    me.rotate = 0;
    me.speed = 0;
    if (typeof arguments[0] === "object") {
        for (p in arguments[0]) {
            me[p] = arguments[0][p];
        }
    }
};

/**
 * @implement AEventObject
 */
AModel.prototype = Object.create(AEventObject.prototype);

/**
 * @method getBox
 * @return {object}
 */
AModel.prototype.getBox = function () {
    var me = this;
    return {
        leftTop: me.position,
        rightTop: {
            x: me.position.x + me.width,
            y: me.position.y
        },
        rightBottom: {
            x: me.position.x + me.width,
            y: me.position.y + me.height
        },
        leftBottom: {
            x: me.position.x,
            y: me.position.y + me.height
        }
    };
};

/**
 * @method getCenter
 * @return {object}
 */
AModel.prototype.getCenter = function () {
    var me = this;
    return {
        x: me.position.x + me.width / 2,
        y: me.position.y + me.height / 2,
    };
};

AModel.prototype.onFrame = function () { };