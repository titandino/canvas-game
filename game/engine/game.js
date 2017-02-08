const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const FPS = 35;

let Game = module.exports = function(startLevel) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.DEBUG = false;
  this.currentLevel = startLevel;
  this.currentLevel.init();

  function main() {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;
  }

  let then = Date.now();
  setInterval(main, 1000 / FPS);
};

Game.canvas = canvas;
Game.ctx = ctx;

Game.drawText = function(text, x, y, color, size, font, align) {
  ctx.fillStyle = color;
  ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
};

Game.getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

Game.getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

Game.prototype.switchLevel = function(newLevel) {
  this.currentLevel.unload();
  this.currentLevel = newLevel;
  this.currentLevel.init();
};

Game.prototype.update = function(delta) {
  this.currentLevel.updateObjects(delta);
  this.currentLevel.update(delta);
};

Game.prototype.render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.currentLevel.renderObjects(ctx);
  this.currentLevel.render(ctx);
};
