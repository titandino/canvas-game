const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const FPS = 35;

let Game = module.exports = function(startLevel) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.DEBUG = false;
  Game.currentLevel = startLevel;
  Game.currentLevel.init();

  let then = Date.now();
  setInterval(() => {
    let now = Date.now();
    let delta = now - then;

    Game.update(delta / 1000);
    Game.render();

    then = now;
  }, 1000 / FPS);
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

Game.switchLevel = function(newLevel) {
  Game.currentLevel.unload();
  Game.currentLevel = newLevel;
  Game.currentLevel.init();
};

Game.update = function(delta) {
  Game.currentLevel.updateObjects(delta);
  Game.currentLevel.update(delta);
};

Game.render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Game.currentLevel.renderObjects(ctx);
  Game.currentLevel.render(ctx);
};
