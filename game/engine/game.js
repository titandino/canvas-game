let StartMenu = require('../startmenu');

const canvas = document.getElementById('game-canvas');
if (!canvas) {
  console.log('No canvas found.');
}

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 35;
exports.DEBUG = false;

let currentLevel = new StartMenu(); //TODO make this into a constructor
currentLevel.init();

exports.drawText = function(text, x, y, color, size, font, align) {
  ctx.fillStyle = color;
  ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
};

exports.getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

exports.getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.switchLevel = function(newLevel) {
  currentLevel.unload();
  currentLevel = newLevel;
  currentLevel.init();
};

function update(delta) {
  currentLevel.updateObjects(delta);
  currentLevel.update(delta);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentLevel.renderObjects();
  currentLevel.render();
}

function main() {
  let now = Date.now();
  let delta = now - then;

  update(delta / 1000);
  render();

  then = now;
}

let then = Date.now();
setInterval(main, 1000 / FPS);

console.log('Set canvas exports.');
exports.canvas = canvas;
exports.currentLevel = currentLevel;
