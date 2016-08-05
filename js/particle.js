function Particle(spriteFile, x, y, speed, scale) {
  GameObject.call(this, spriteFile, x, y, scale);

  this.speed = speed;
  this.scale = scale;
  this.transparency = 1;
  this.life = 0;
  this.hasLife = false;
  this.visible = true;
}

Particle.prototype = new GameObject();
Particle.prototype.constructor = Particle;
Particle.prototype.parent = GameObject.prototype;

Particle.prototype.setLife = function(life) {
  this.life = life;
  this.hasLife = true;
};

Particle.prototype.render = function() {
  if (this.visible) {
    ctx.globalAlpha = this.transparency;
    ctx.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2, this.scale, this.scale);
    ctx.globalAlpha = 1;
  }
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
