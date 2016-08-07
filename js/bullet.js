Bullet.prototype = new GameObject();

function Bullet(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
}

Bullet.prototype.update = function() {
  for(var i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      if (this.rectCollide(currentLevel.asteroids[i])) {
        currentLevel.score += 100 - currentLevel.asteroids[i].scale;
        currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', currentLevel.asteroids[i].x, currentLevel.asteroids[i].y, 2, 50, 5, 15, 40, 80, -50, 50, -50, 50));
        currentLevel.removeGameObject(currentLevel.asteroids[i]);
        delete currentLevel.asteroids[i];
      }
    }
  }
  if (this.getLeftBound() >= canvas.width)
    currentLevel.removeGameObject(this);
  if (this.getRightBound() <= 0)
    currentLevel.removeGameObject(this);
  if (this.getTopBound() >= canvas.height)
    currentLevel.removeGameObject(this);
  if (this.getBottomBound() <= 0)
    currentLevel.removeGameObject(this);
};
