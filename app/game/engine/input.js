let Game = require('./game');

let keysDown = [];
let mousePos = {x: 0, y: 0};

exports.mousePos = mousePos;
exports.keysDown = keysDown;

Game.canvas.addEventListener('mousedown', function(e) {
  let pos = getLocalMousePos(Game.canvas, e);
  mousePos.x = pos.x;
  mousePos.y = pos.y;
  Game.currentLevel.onMouseDown();
}, false);

Game.canvas.addEventListener('mousemove', function(e) {
  let pos = getLocalMousePos(Game.canvas, e);
  mousePos.x = pos.x;
  mousePos.y = pos.y;
}, false);

function getLocalMousePos(canvas, e) {
  let rect = Game.canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / (rect.right - rect.left) * Game.canvas.width,
    y: (e.clientY - rect.top) / (rect.bottom - rect.top) * Game.canvas.height
  };
}

window.addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;
  switch(e.keyCode) {
  case 37:
  case 39:
  case 38:
  case 40:
  case 32:
    e.preventDefault();
    break;
  default:
    break;
  }
}, false);

window.addEventListener('keyup', function(e) {
  keysDown[e.keyCode] = false;
}, false);
