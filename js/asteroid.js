Asteroid.prototype = Object.create(GameObject.prototype);

function Asteroid(x, y, scale) {
  GameObject.call(this, 'asteroid.png', x, y, scale);
}

Asteroid.prototype.update = function() {
  if (this.getLeftBound() >= canvas.width)
    currentLevel.removeGameObject(this);
  if (this.getRightBound() <= 0)
    currentLevel.removeGameObject(this);
  if (this.getTopBound() >= canvas.height)
    currentLevel.removeGameObject(this);
  if (this.getBottomBound() <= 0)
    currentLevel.removeGameObject(this);
};

Asteroid.prototype.processHit = function() {
  currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
  currentLevel.score += Math.floor(100 - this.scale);
  if (this.scale >= 40) {
    for(var i = 0;i < getRandom(2, 4);i++) {
      var asteroid = new Asteroid(this.x, this.y, this.scale / 2);
      asteroid.velocity = this.velocity.getRotatedBy(getRandomFloat(-1, 1));
      currentLevel.asteroids.push(currentLevel.addGameObject(asteroid));
    }
  }
};
