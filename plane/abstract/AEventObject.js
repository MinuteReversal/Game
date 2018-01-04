/**
 * @author   : zhy
 * @datetime : 2017-12-27
 * @file AEventObject.js
 */

var AEventObject = function () {
    IEventObject.apply(this, arguments);
    this.listeners = [];
};

//@implement IEventObject
AEventObject.prototype = Object.create(IEventObject.prototype);

/**
 * @override addEventListener
 * @method addEventListener
 * @param {string} type 
 * @param {function} listener
 */
AEventObject.prototype.addEventListener = function (type, listener) {
    var me = this;
    me.listeners.push({
        type: type,
        listeners: listener
    });
};

/**
 * @override removeEventListener
 * @method removeEventListener
 * @param {string|funtion} type 
 * @param {function} listener 
 */
AEventObject.prototype.removeEventListener = function (type, listener) {
    var me = this;
    var lsn = arguments[1];
    var removeList = [];
    if (typeof arguments[0] === "function") lsn = type;

    for (var i = 0, item; item = me.listeners[i]; i++) {
        var removeItem = null;
        if (typeof arguments[0] === "string" && typeof arguments[1] === "function") {
            removeItem = item;
        }
        else if (typeof arguments[0] === "function") {
            removeItem = item;
        }

        if (removeItem) {
            removeList.push(removeItem);
        }
    }

    for (var i = 0, item; item = removeList[i]; i++) {
        me.listeners.splice(me.listeners.indexOf(item), 1);
    }
};

/**
 * @override dispatchEvent
 * @method dispatchEvent
 * @param {string} type 
 * @param {object} event 
 */
AEventObject.prototype.dispatchEvent = function (type, event) {
    var me = this;
    for (var i = 0, item; item = me.listeners[i]; i++) {
        if (item.type === type) {
            item.listeners(event);
        }
    }
};