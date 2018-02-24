import './js/weapp-adapter'
import app from './js/app.min.js'

app.dataBus.resource.list = [
  { key: "bg", src: "resource/bg.png" },
  { key: "plane", src: "resource/plane.png" },
  { key: "enemy1", src: "resource/enemy1.png" },
  { key: "enemy2", src: "resource/enemy2.png" },
  { key: "enemy3", src: "resource/enemy3.png" },
  { key: "enemy3explode", src: "resource/enemy3explode.png" },
  { key: "bullet1", src: "resource/bullet1.png" },
  { key: "bullet2", src: "resource/bullet2.png" },
  { key: "doubleLaser", src: "resource/doubleLaser.png" },
  { key: "bomb", src: "resource/bomb.png" },
  { key: "bombButton", src: "resource/bombButton.png" },
  { key: "cross", src: "resource/cross.png" },
  { key: "number", src: "resource/number.png" },
  { key: "face", src: "resource/face.png" },
  { key: "common", src: "resource/common.png" },
  { key: "bgm", src: "resource/game_music.mp3" },
  { key: "bullet", src: "resource/bullet.mp3" },
  { key: "enemy1down", src: "resource/enemy1_down.mp3" },
  { key: "enemy2down", src: "resource/enemy2_down.mp3" },
  { key: "enemy2out", src: "resource/enemy2_out.mp3" },
  { key: "enemy3down", src: "resource/enemy3_down.mp3" },
  { key: "gameover", src: "resource/game_over.mp3" },
  { key: "bomb", src: "resource/get_bomb.mp3" },
  { key: "usebomb", src: "resource/use_bomb.mp3" },
  { key: "getdoublelaser", src: "resource/get_double_laser.mp3" },
  { key: "getbomb", src: "resource/get_bomb.mp3" }
];

var game = new app.Game({
  keyboard: new app.KeyboardListener(),
  mouse: new app.MouseListener(),
  touch: new app.TouchListener(canvas),
  canvas: canvas,
  width: innerWidth > 640 ? 640 : innerWidth,
  height: innerHeight > 1136 ? 1136 : innerHeight
});