import './js/weapp-adapter'
import * as app from './js/app.min'

dataBus.resource.list = [
  { key: "bg", src: "resource/resource.png" },
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

var game = new Game({
  keyboard: new KeyboardListener(),
  mouse: new MouseListener(),
  touch: new TouchListener(),
  canvas: canvas,
  width: innerWidth > 640 ? 640 : innerWidth,
  height: innerHeight > 1136 ? 1136 : innerHeight
});