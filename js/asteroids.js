Asteroids.prototype = new Level();

function Asteroids() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new Ship('ship.png', canvas.width / 2, canvas.height / 2, 20, this));

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
  for(var i = 0;i < 5;i++) {
    this.spawnAsteroid();
  }
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
