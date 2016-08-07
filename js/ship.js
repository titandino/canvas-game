Ship.prototype = new GameObject();

function Ship(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.health = 100;
  this.shotTimer = 1.0;
}

Ship.prototype.removeHealth = function(amount) {
  this.health -= amount;
  if (this.health <= 0) {
    this.health = 0;
    drawText('YOU LOSE.', canvas.width / 2, canvas.height / 2, '#00FF00');
  }
};

Ship.prototype.update = function(delta) {
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

  if (keysDown[68]) {
    this.rotation += 3 * delta;
  } else if (keysDown[65]) {
    this.rotation -= 3 * delta;
  }

  if (keysDown[87]) {
    var fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale);
    this.acceleration = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(50);
    currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 2, 2, 5, 15, 40, 80,
    (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
  } else if (keysDown[83]) {
    this.acceleration = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(50);
  }

  if (this.getRightBound() >= canvas.width)
    this.x = canvas.width - this.sprite.width / 2;
  if (this.getLeftBound() <= 0)
    this.x = this.sprite.width / 2;
  if (this.getBottomBound() >= canvas.height)
    this.y = canvas.height - this.sprite.height / 2;
  if (this.getTopBound() <= 0)
    this.y = this.sprite.height / 2;
};
