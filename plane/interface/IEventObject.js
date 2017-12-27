/**
 * @author   : zhy
 * @datetime : 2017-12-27
 * @file IEventObject.js
 */

/**
 * @interface IEventObject
 */
var IEventObject = function () { };

/**
 * @method addEventListener
 * @param {string} type 
 * @param {function} listener 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
IEventObject.prototype.addEventListener = function (type, listener) { throw new Error("not implement"); };

/**
 * @method removeEventListener
 * @param {string} type 
 * @param {function} listener 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
 */
IEventObject.prototype.removeEventListener = function (type,listener) { throw new Error("not implement"); };

/**
 * @method dispactchEvent
 * @param {string} type 
 * @param {object} event 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
 */
IEventObject.prototype.dispactchEvent = function (type, event) { throw new Error("not implement"); };