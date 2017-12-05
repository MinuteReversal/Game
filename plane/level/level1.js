/**
 * @author:zhy
 * @date:20171108
 */

var level1 = {
    background: new Background(),
    enemyTypes: [
        Enemy1
    ],
    count: 0,
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     * @func getRandomArbitrary
     * @param {number} min 
     * @param {number} max 
     */
    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    generate: function (timestamp) {
        var me = this;
        if (++me.count === 30) {
            me.count = 0;
            return new Enemy1({ position: { x: me.getRandomArbitrary(0, 640), y: 0 } });
        }
        return null;
    }
};