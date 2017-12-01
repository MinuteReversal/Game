/**
 * @author:zhy
 * @date:20171108
 */

var level1 = {
    background: new Background(),
    enemyTypes: [
        Enemy1
    ],
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     * @func getRandomArbitrary
     * @param {number} min 
     * @param {number} max 
     */
    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    generate: function () {
        var me = this;
        var list = [];
        for (var i = 0; i <= 30; i++) {
            list.push({ time: getRandomArbitrary(0, 30 * 1000), add: new Enemy1({ position: { x: getRandomArbitrary(0, 640), y: 0 } }) });
        }
        list.sort(function (a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        });
        return list;
    }
};