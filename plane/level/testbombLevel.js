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
            //e = new Enemy1();
            e = new Bomb();
        }
        else if (r === 2) {
            //e = new Enemy2();
            e = new DoubleLaser();
        }
        else if (r === 3) {
            //e = new Enemy3();
            e = new Enemy1();
        }
        e.position.x = me.getRandomArbitrary(0, me.width - e.width);
        e.position.y = -e.height;

        if (me.isEgdeCollision(e)) return null;
        return e;
    }
    return null;
};

Level1.prototype.isEgdeCollision = function (e) {
    var me = this;
    for (var i = 0, item; item = dataBus.list[i]; i++) {
        if (item.isEgdeCollision(item, e) && item instanceof AEnemy) return true;
    }
    return false;
};