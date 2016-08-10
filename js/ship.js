Ship.prototype = new GameObject();

function Ship(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.health = 100;
  this.timeBetweenShots = 0.5;
  this.shotTimer = 0;
  this.turnSpeed = 3;
  this.speed = 80;
}

Ship.prototype.removeHealth = function(amount) {
  this.health -= amount;
  if (this.health <= 0) {
    this.health = 0;
  }
};

Ship.prototype.update = function(delta) {
  if (this.shotTimer > 0) {
    this.shotTimer -= delta;
  }

  for(var i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      if (this.rectCollide(currentLevel.asteroids[i])) {
        this.removeHealth(getRandom(5, 9));
        currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', currentLevel.asteroids[i].x, currentLevel.asteroids[i].y, 2, 75, 8, 25, 40, 80, -50, 50, -50, 50));
        currentLevel.removeGameObject(currentLevel.asteroids[i]);
        delete currentLevel.asteroids[i];
      }
    }
  }

  var accelDamper = 0.40;
  var velDamper = 0.995;

  this.acceleration.x *= accelDamper;
  this.acceleration.y *= accelDamper;
  this.velocity.x *= velDamper;
  this.velocity.y *= velDamper;

  if (keysDown[32]) {
    if (this.shotTimer <= 0) {
      var bulletOffset = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.scale);
      var bullet = new Bullet('#FF0000', this.x + bulletOffset.x, this.y + bulletOffset.y, 5);
      bullet.velocity = bulletOffset.normalize().multiplyByScalar(500);
      currentLevel.addGameObject(bullet);
      this.shotTimer = this.timeBetweenShots;
    }
  }

  if (keysDown[68]) {
    this.rotation += this.turnSpeed * delta;
  } else if (keysDown[65]) {
    this.rotation -= this.turnSpeed * delta;
  }

  if (keysDown[87]) {
    var fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale);
    this.acceleration = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.speed);
    currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 2, 2, 5, 15, 40, 80,
    (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
  } else if (keysDown[83]) {
    this.acceleration = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.speed);
  }

  if (this.getLeftBound() >= canvas.width)
    this.x = 1;
  if (this.getRightBound() <= 0)
    this.x = canvas.width - 1;
  if (this.getTopBound() >= canvas.height)
    this.y = 1;
  if (this.getBottomBound() <= 0)
    this.y = canvas.height - 1;
};
