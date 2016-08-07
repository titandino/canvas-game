Asteroids.prototype = new Level();

var asteroids = [];
var spawnTime = 15;
var timer = 0;
var life = 100;

function Asteroids() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('ship.png', canvas.width / 2, canvas.height / 2, 20));

  this.update = function(delta) {
    if (timer > 0) {
      timer -= delta;
    } else {
      this.spawnWave();
      timer = spawnTime;
    }
  };

  this.spawnWave = function() {
    for(var i = 0;i < 5;i++) {
      this.spawnAsteroid();
    }
  };

  this.spawnAsteroid = function() {
    var dir = getRandom(0, 5);
    var asteroid = new GameObject('asteroid.png', 0, 0, getRandom(25, 75));
    if (dir <= 1) {
      asteroid.x = 0;
      asteroid.y = 0;
      asteroid.direction = new Vector2(getRandomFloat(10, 50), getRandomFloat(10, 50));
    } else if (dir === 2) {
      asteroid.x = 0;
      asteroid.y = canvas.height;
      asteroid.direction = new Vector2(getRandomFloat(10, 50), getRandomFloat(-10, -50));
    } else if (dir === 3) {
      asteroid.x = canvas.width;
      asteroid.y = canvas.height;
      asteroid.direction = new Vector2(getRandomFloat(-10, -50), getRandomFloat(-10, -50));
    } else {
      asteroid.x = canvas.width;
      asteroid.y = 0;
      asteroid.direction = new Vector2(getRandomFloat(-10, -50), getRandomFloat(10, 50));
    }
    asteroids.angularVelocity = getRandom(1, 2);
    asteroids.push(this.addGameObject(asteroid));
  };

  this.render = function() {
    drawText('Ship health: ' + life, 20, 20, '#00FF00');
    if (DEBUG) {
      drawText('Game object buffer len: ' + this.gameObjects.length, 20, 32, '#00FF00');
      drawText('Game objects: ' + this.objectCount(), 20, 44, '#00FF00');
    }
  };
}
