/**
 * @author:zhy
 * @date:20171108
 */

var Level1 = function (options) {
    this.enemyTypes = [
        Enemy1
    ];
    this.count = 0;
    this.width = options.width;
    this.height = options.height;
};

/**
* @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* @func getRandomArbitrary
* @param {number} min 
* @param {number} max 
*/
Level1.prototype.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
};

Level1.prototype.generate = function (timestamp) {
    var me = this;
    if (++me.count === 40) {
        me.count = 0;
        var e = null;
        var r = parseInt(me.getRandomArbitrary(1, 4));
        if (r === 1) {
            e = new Enemy1();
        }
        else if (r === 2) {
            e = new Enemy2();
        }
        else if (r === 3) {
            e = new Enemy3();
        }
        e.position.x = me.getRandomArbitrary(0, me.width - e.width);
        e.y = -e.height;
        return e;
    }
    return null;
};