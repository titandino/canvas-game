Bullet.prototype = Object.create(GameObject.prototype);

function Bullet(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
}

Bullet.prototype.update = function() {
  for(var i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      if (this.rectCollide(currentLevel.asteroids[i])) {
        currentLevel.removeGameObject(this);
        currentLevel.removeGameObject(currentLevel.asteroids[i]);
        currentLevel.asteroids[i].processHit(i);
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
