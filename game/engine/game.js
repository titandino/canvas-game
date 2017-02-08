const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const FPS = 35;

module.exports = function Game(startLevel) {
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
  currentLevel.renderObjects(ctx);
  currentLevel.render(ctx);
}


Game.canvas = canvas;
Game.currentLevel = currentLevel;
