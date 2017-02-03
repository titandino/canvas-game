let Game = require('./engine/game');
let Level = require('./engine/level');
let Input = require('./engine/input');

let StartMenu = require('./startmenu');

ControlsMenu.prototype = Object.create(Level.prototype);

function ControlsMenu() {
  Level.call(this);
}

ControlsMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.controls = this.addGameObject(new GameObject('controlsbg.png', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height < Game.canvas.width ? Game.canvas.height : Game.canvas.width));
  this.backButton = this.addGameObject(new GameObject('back.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2 + 200, 100));
};

ControlsMenu.prototype.onMouseDown = function() {
  if (this.backButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new StartMenu());
  }
};
