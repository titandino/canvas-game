Bullet.prototype = Object.create(GameObject.prototype);

function Bullet(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.deleteOnViewportExit = true;
}

Bullet.prototype.update = function() {
  for(let i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      if (this.rectCollide(currentLevel.asteroids[i])) {
        currentLevel.asteroids[i].processHit(i);
        currentLevel.removeGameObject(this);
        currentLevel.removeGameObject(currentLevel.asteroids[i]);
        currentLevel.asteroids[i] = null;
      }
    }
  }
};
