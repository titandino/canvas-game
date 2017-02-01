Particle.prototype = Object.create(GameObject.prototype);

function Particle(spriteFile, x, y, scale) {
  GameObject.call(this, spriteFile, x, y, scale);
  this.life = 0;
  this.hasLife = false;
  this.rotation = getRandomFloat(-5, 5);
  this.deleteOnViewportExit = true;
}

Particle.prototype.setLife = function(life) {
  this.life = life;
  this.hasLife = true;
};

Particle.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.life <= 0) {
      this.markedForDeletion = true;
    } else {
      this.life -= delta;
    }
  }
};
