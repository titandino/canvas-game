let Level = require('./engine/level');
let Game = require('./engine/game');
let Input = require('./engine/input');
let GameObject = require('./engine/gameobject');

let LossMenu = module.exports = function(score) {
  Level.call(this);

  this.score = score;
};

LossMenu.prototype = Object.create(Level.prototype);

LossMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.backButton = this.addGameObject(new GameObject('back.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2 + 200, 100));
};

LossMenu.prototype.render = function() {
  Game.drawText('YOUR SHIP WAS DESTROYED', Game.canvas.width / 2, Game.canvas.height / 2 - 200, '#00FF00', '50px', 'Helvetica', 'center');
  Game.drawText('FINAL SCORE: ' + this.score, Game.canvas.width / 2, Game.canvas.height / 2, '#00FF00', '50px', 'Helvetica', 'center');
};

LossMenu.prototype.onMouseDown = function() {
  let StartMenu = require('./startmenu');
  if (this.backButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new StartMenu());
  }
};
