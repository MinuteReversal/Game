var fs = require('fs');
var UglifyJS = require("C:\\Windows\\System32\\node_modules\\uglify-js");
const time = `/*${new Date().toUTCString()}*/`;
const distPath = "dist/h5/";
const fileName = "app.min.js";

// 批量读取文件，压缩之
function buildOne(fileIn, fileOut) {
    var result = UglifyJS.minify(fileIn);
    fs.writeFileSync(fileOut, "".concat(time, "\r\n", result.code), 'utf8');
}

var files = [
    "lib/polyfill/Object.assign.js",
    "lib/polyfill/Array.prototype.forEach.js",
    "lib/linq.js",
    "lib/sound.js",
    "interface/IEventObject.js",
    "abstract/AEventObject.js",
    "Implement/resource.js",
    "Implement/dataBus.js",
    "abstract/AModel.js",
    "abstract/ABullet.js",
    "model/background.js",
    "model/face.js",
    "model/dialog.js",
    "model/button.js",
    "model/bullet1.js",
    "model/bullet2.js",
    "model/plane.js",
    "abstract/AEnemy.js",
    "model/enemy1.js",
    "model/enemy2.js",
    "model/enemy3.js",
    "abstract/APowerUp.js",
    "model/bomb.js",
    "model/doubleLaser.js",
    "level/level1.js",
    "model/numberText.js",
    "model/text.js",
    "model/bombButton.js",
    "model/cross.js",
    "lib/keyboardListener.js",
    "lib/mouseListener.js",
    "lib/touchListener.js",
    "Implement/game.js"
];


//合并为一个文件
var all = time;
for (var i = 0, file; file = files[i]; i++) {
    all += fs.readFileSync(file, 'utf8');
}
//fs.writeFileSync("app.js", all, 'utf8');


//合并且压缩
buildOne(
    files,
    `${distPath}/js/${fileName}`
);

//复制图片和音频
var resources = [
    "resource/touch-icon-ipad.png"
    , "resource/touch-icon-iphone-retina.png"
    , "resource/touch-icon-ipad-retina.png"
    , "resource/resource.png"
    , "resource/number.png"
    , "resource/face.png"
    , "resource/common.png"
    , "resource/game_music.mp3"
    , "resource/bullet.mp3"
    , "resource/enemy1_down.mp3"
    , "resource/enemy2_down.mp3"
    , "resource/enemy2_out.mp3"
    , "resource/enemy3_down.mp3"
    , "resource/game_over.mp3"
    , "resource/get_bomb.mp3"
    , "resource/use_bomb.mp3"
    , "resource/get_double_laser.mp3"
    , "resource/get_bomb.mp3"
];

if (!fs.existsSync(`${distPath}/resource`)) fs.mkdir(`${distPath}/resource`, () => { });

for (var i = 0, item; item = resources[i]; i++) {
    fs.createReadStream(item).pipe(fs.createWriteStream(`${distPath}/${item}`));
}

//cache
var cache = [];
cache.push("CACHE MANIFEST");
cache.push(`#${time}`);
cache.push(`js/${fileName}`);
cache = cache.concat(resources);
cache.push("NETWORK:");
cache.push("*");
cache.push("FALLBACK:");
fs.writeFile(`${distPath}/site.appcache`, cache.join("\r\n"), 'utf8', () => { });


console.log("Complete");