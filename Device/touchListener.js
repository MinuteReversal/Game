/**
 * @author : ReversalMinute
 * @mail   : mailzy@vip.qq.com
 * @date   : 2017-11-24
 * @docs   : https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 *           https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 */

/**
 * @class TouchListener
 * @returns {touch} 
 */
function TouchListener() {
    var me = this;
    me.Touchs =[];
    
    window.addEventListener("touchstart", function (touchEvent) {
        touchEvent.preventDefault();
        me.setTouchStatus(mouseEvent, true);
    });
    window.addEventListener("touchend", function (touchEvent) {
        touchEvent.preventDefault();
        me.setTouchStatus(mouseEvent, false);
    });
    window.addEventListener("touchcancel", function (touchEvent) {
        touchEvent.preventDefault();
        me.mouse.X = mouseEvent.clientX;
        me.mouse.Y = mouseEvent.clientY;
    });
    window.addEventListener("touchmove", function (touchEvent) {
        touchEvent.preventDefault();
        me.mouse.Wheel += touchEvent.wheelDelta;
    });
    return me.mouse;
}

TouchListener.prototype.setMouseStatus = function (mouseEvent, isButtonDown) {
    var me = this;
    var mouse = me.mouse;
    switch (mouseEvent.which) {
        case 1:
            mouse.Left = isButtonDown;
            if (mouse.Left) {
                mouse.LeftDownPosition.X = mouseEvent.clientX;
                mouse.LeftDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.LeftDownPosition.X = 0;
                mouse.LeftDownPosition.Y = 0;
            }
            break;
        case 2:
            mouse.Middle = isButtonDown;
            if (mouse.Middle) {
                mouse.MiddleDownPosition.X = mouseEvent.clientX;
                mouse.MiddleDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.MiddleDownPosition.X = 0;
                mouse.MiddleDownPosition.Y = 0;
            }
            break;
        case 3:
            mouse.Right = isButtonDown;
            if (mouse.Right) {
                mouse.RightDownPosition.X = mouseEvent.clientX;
                mouse.RightDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.RightDownPosition.X = 0;
                mouse.RightDownPosition.Y = 0;
            }
            break;
        default:
    }
};