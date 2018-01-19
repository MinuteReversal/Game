/**
 * @author   : zhy
 * @datetime : 2017-12-27
 * @file AModel.js
 */

var AModel = function () {
    AEventObject.apply(this, arguments);
    var me = this;
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
    me.scale = 1;
    me.speed = 0;
    me.image = null;

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

AModel.prototype.inBox = function (point) {
    var me = this;
    if (point.x >= me.position.x &&
        point.x <= me.position.x + me.width &&
        point.y >= me.position.y &&
        point.y <= me.position.y + me.height
    ) return true;
    return false;
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

AModel.prototype.onFrame = function (evt) {
    var me = this;

    var o = me.getCollision(me);
    if (o) {
        me.dispatchEvent("collision", { target: o });
        o.dispatchEvent("collision", { target: me });
    }
};

AModel.prototype.getCollision = function (o) {
    var me = this;
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        if (item instanceof Background) continue;
        if (item === o) continue;
        if (me.isEgdeCollision(item, o)) return item;
    }
    return null;
};

AModel.prototype.isEgdeCollision = function (rect1, rect2) {
    if (rect1.position.x < rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.height &&
        rect1.height + rect1.position.y > rect2.position.y) {
        return true;
    } else {
        return false;
    }
};
