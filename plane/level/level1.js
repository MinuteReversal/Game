/**
 * @author:zhy
 * @date:20171108
 */

var level1 = {
    plan: [
        { time: 0, add: background },
    ]
};
/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @func getRandomArbitrary
 * @param {number} min 
 * @param {number} max 
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

for (var i = 0; i <= 30; i++) {
    level1.plan.push({ time: getRandomArbitrary(0, 30 * 1000), add: new Enemy1({ position: { x: getRandomArbitrary(0, 640), y: 0 } }) });
}
