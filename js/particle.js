Particle.prototype = new GameObject();

function Particle(spriteFile, x, y, speed, scale) {
  GameObject.call(this, spriteFile, x, y, scale);
  this.speed = speed;
  this.life = 0;
  this.hasLife = false;
  this.visible = true;
}

Particle.prototype.setLife = function(life) {
  this.life = life;
  this.hasLife = true;
};

Particle.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.life <= 0) {
      currentLevel.removeGameObject(this);
    } else {
      this.life -= delta;
    }
  }

  this.direction.normalize();
  this.x += this.direction.x * this.speed * delta;
  this.y += this.direction.y * this.speed * delta;
  if (this.getLeftBound() >= canvas.width)
    currentLevel.removeGameObject(this);
  if (this.getRightBound() <= 0)
    currentLevel.removeGameObject(this);
  if (this.getTopBound() >= canvas.height)
    currentLevel.removeGameObject(this);
  if (this.getBottomBound() <= 0)
    currentLevel.removeGameObject(this);
};
