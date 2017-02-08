let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');
let Vector2 = require('./engine/vector2');
let Level = require('./engine/level');

let Ship = require('./ship');
let Asteroid = require('./asteroid');
let PowerUp = require('./powerup');

let Asteroids = module.exports = function() {
  Level.call(this);

  this.asteroids = [];
  this.spawnTime = 10;
  this.timer = 0;
  this.score = 0;
  this.wavesSpawned = 0;
};

Asteroids.prototype = Object.create(Level.prototype);

Asteroids.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.player = this.addGameObject(new Ship('ship.png', Game.canvas.width / 2, Game.canvas.height / 2, 20));
  this.player.shield = this.addGameObject(new GameObject('#00FFFF', 0, 0, 50, 1));
  this.player.shield.visible = false;
};

Asteroids.prototype.update = function(delta) {
  if (this.timer > 0) {
    this.timer -= delta;
  } else {
    this.spawnWave();
    this.timer = this.spawnTime;
  }
};

Asteroids.prototype.increaseDifficulty = function() {
  if (this.spawnTime > 7)
    this.spawnTime--;
  else if (this.spawnTime > 4)
    this.spawnTime -= 0.5;
  else if (this.spawnTime > 2)
    this.spawnTime -= 0.2;
};

Asteroids.prototype.spawnWave = function() {
  this.wavesSpawned += 1;
  if (this.wavesSpawned % 5) {
    this.increaseDifficulty();
  }
  if (Game.getRandom(0, 100) < 50)
    this.spawnPowerUp();
  for(let i = 0;i < 5;i++) {
    this.spawnAsteroid();
  }
};

Asteroids.prototype.spawnPowerUp = function() {
  this.addGameObject(new PowerUp(Game.getRandom(0, this.player.powerups.length), Game.getRandom(50, canvas.width), Game.getRandom(50, canvas.height)));
};

Asteroids.prototype.spawnAsteroid = function() {
  let dir = Game.getRandom(0, 5);
  let asteroid = new Asteroid(0, 0, Game.getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = canvas.width;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(-10, -50));
  } else {
    asteroid.x = canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = Game.getRandomFloat(-2, 2);
  for (let i = 0;i < this.asteroids.length;i++) {
    if (!this.asteroids[i]) {
      this.asteroids[i] = this.addGameObject(asteroid);
      return;
    }
  }
  this.asteroids.push(this.addGameObject(asteroid));
};

Asteroids.prototype.render = function() {
  Game.drawText('Ship health: ' + this.player.health, 20, 20, '#00FF00');
  Game.drawText('Score: ' + this.score, 20, 32, '#00FF00');
  if (Game.DEBUG) {
    Game.drawText('Game object buffer len: ' + this.gameObjects.length, 20, 44, '#00FF00');
    Game.drawText('Game objects: ' + this.objectCount(), 20, 56, '#00FF00');
  }
};
