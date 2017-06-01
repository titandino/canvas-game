let Game = require('./engine/game');
let Input = require('./engine/input');
let Level = require('./engine/level');
let Particle = require('./engine/particle');
let Vector2 = require('./engine/vector2');
let GameObject = require('./engine/gameobject');

let ControlsMenu = require('./controlsmenu');
let Asteroids = require('./asteroids');

let StartMenu = module.exports = function() {
  Level.call(this);

  this.timer = 1.0;
};

StartMenu.prototype = Object.create(Level.prototype);

StartMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.logo = this.addGameObject(new GameObject('logo.png', Game.canvas.width / 2, Game.canvas.height / 2 - 100, 400, 2));
  this.playButton = this.addGameObject(new GameObject('play.png', Game.canvas.width / 2 - 200, Game.canvas.height / 2, 100, 2));
  this.controlsButton = this.addGameObject(new GameObject('controls.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2, 100, 2));
};

StartMenu.prototype.update = function(delta) {
  if (this.timer > 0)
    this.timer -= delta;
  if (this.timer <= 0) {
    this.spawnAsteroid();
    this.timer = 1.0;
  }
};

StartMenu.prototype.onMouseDown = function() {
  if (this.playButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new Asteroids());
  } else if (this.controlsButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new ControlsMenu());
  }
};

StartMenu.prototype.spawnAsteroid = function() {
  let dir = Game.getRandom(0, 5);
  let asteroid = new Particle('asteroid.png', 0, 0, Game.getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = Game.canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = Game.canvas.width;
    asteroid.y = Game.canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(-10, -50));
  } else {
    asteroid.x = Game.canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = Game.getRandomFloat(-2, 2);
  this.addGameObject(asteroid);
};
