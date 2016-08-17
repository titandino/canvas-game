Asteroids.prototype = new Level();

function Asteroids() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.height > canvas.width ? canvas.height : canvas.width, -1));
  this.player = this.addGameObject(new Ship('ship.png', canvas.width / 2, canvas.height / 2, 20));
  this.player.shield = this.addGameObject(new GameObject('#00FFFF', 0, 0, 50, 1));
  this.player.shield.visible = false;

  this.asteroids = [];
  this.spawnTime = 9;
  this.timer = 0;
  this.score = 0;
}

Asteroids.prototype.update = function(delta) {
  if (this.timer > 0) {
    this.timer -= delta;
  } else {
    this.spawnWave();
    this.timer = this.spawnTime;
  }
};

Asteroids.prototype.spawnWave = function() {
  this.spawnPowerUp();
  for(var i = 0;i < 5;i++) {
    this.spawnAsteroid();
  }
};

Asteroids.prototype.spawnPowerUp = function() {
  this.addGameObject(new PowerUp(getRandom(0, this.player.powerups.length), getRandom(50, canvas.width), getRandom(50, canvas.height)));
};

Asteroids.prototype.spawnAsteroid = function() {
  var dir = getRandom(0, 5);
  var asteroid = new Particle('asteroid.png', 0, 0, getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(getRandomFloat(10, 50), getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(getRandomFloat(10, 50), getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = canvas.width;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(getRandomFloat(-10, -50), getRandomFloat(-10, -50));
  } else {
    asteroid.x = canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(getRandomFloat(-10, -50), getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = getRandomFloat(-2, 2);
  this.asteroids.push(this.addGameObject(asteroid));
};

Asteroids.prototype.render = function() {
  drawText('Ship health: ' + this.player.health, 20, 20, '#00FF00');
  drawText('Score: ' + this.score, 20, 32, '#00FF00');
  if (DEBUG) {
    drawText('Game object buffer len: ' + this.gameObjects.length, 20, 44, '#00FF00');
    drawText('Game objects: ' + this.objectCount(), 20, 56, '#00FF00');
  }
};

PowerUp.prototype = new GameObject();

var POWERUP_TRISHOT = 0;
var POWERUP_SHOT_SPEED = 1;
var POWERUP_INVULNERABILITY = 2;

function PowerUp(type, x, y) {
  GameObject.call(this, this.getSpriteByType(type), x, y, 30);
  this.type = type;
}

PowerUp.prototype.update = function() {
  if (currentLevel.player.rectCollide(this)) {
    currentLevel.addParticleSystem(new ParticleSystem('#00FFFF', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
    currentLevel.player.powerups[this.type] = 15;
    currentLevel.removeGameObject(this);
  }
};

PowerUp.prototype.getSpriteByType = function(type) {
  switch(type) {
  case 0:
    return 'trishot.png';
  case 1:
    return 'shotspeed.png';
  case 2:
    return 'invulnerability.png';
  default:
    return '#00FF00';
  }
};

StartMenu.prototype = new Level();

function StartMenu() {
  Level.call(this);

  this.timer = 1.0;

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.height > canvas.width ? canvas.height : canvas.width, -1));
  this.logo = this.addGameObject(new GameObject('logo.png', canvas.width / 2, canvas.height / 2 - 100, 400));
  this.playButton = this.addGameObject(new GameObject('play.png', canvas.width / 2 - 200, canvas.height / 2, 100));
  this.controlsButton = this.addGameObject(new GameObject('controls.png', canvas.width / 2 + 200, canvas.height / 2, 100));
}

StartMenu.prototype.update = function(delta) {
  if (this.timer > 0)
    this.timer -= delta;
  if (this.timer <= 0) {
    this.spawnAsteroid();
    this.timer = 1.0;
  }
};

StartMenu.prototype.onMouseDown = function() {
  if (this.playButton.pointCollide(mousePos.x, mousePos.y)) {
    switchLevel(new Asteroids());
  } else if (this.controlsButton.pointCollide(mousePos.x, mousePos.y)) {
    switchLevel(new ControlsMenu());
  }
};

StartMenu.prototype.spawnAsteroid = function() {
  var dir = getRandom(0, 5);
  var asteroid = new Particle('asteroid.png', 0, 0, getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(getRandomFloat(10, 50), getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(getRandomFloat(10, 50), getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = canvas.width;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(getRandomFloat(-10, -50), getRandomFloat(-10, -50));
  } else {
    asteroid.x = canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(getRandomFloat(-10, -50), getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = getRandomFloat(-2, 2);
  this.addGameObject(asteroid);
};

ControlsMenu.prototype = new Level();

function ControlsMenu() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.height > canvas.width ? canvas.height : canvas.width, -1));
  this.controls = this.addGameObject(new GameObject('controlsbg.png', canvas.width / 2, canvas.height / 2, canvas.height < canvas.width ? canvas.height : canvas.width));
  this.backButton = this.addGameObject(new GameObject('back.png', canvas.width / 2 + 200, canvas.height / 2 + 200, 100));
}


ControlsMenu.prototype.onMouseDown = function() {
  if (this.backButton.pointCollide(mousePos.x, mousePos.y)) {
    switchLevel(new StartMenu());
  }
};

LossMenu.prototype = new Level();

function LossMenu(score) {
  Level.call(this);

  this.score = score;
  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.height > canvas.width ? canvas.height : canvas.width, -1));
  this.backButton = this.addGameObject(new GameObject('back.png', canvas.width / 2 + 200, canvas.height / 2 + 200, 100));
}

LossMenu.prototype.render = function() {
  drawText('YOUR SHIP WAS DESTROYED', canvas.width / 2, canvas.height / 2 - 200, '#00FF00', '50px', 'Helvetica', 'center');
  drawText('FINAL SCORE: ' + this.score, canvas.width / 2, canvas.height / 2, '#00FF00', '50px', 'Helvetica', 'center');
};

LossMenu.prototype.onMouseDown = function() {
  if (this.backButton.pointCollide(mousePos.x, mousePos.y)) {
    switchLevel(new StartMenu());
  }
};
