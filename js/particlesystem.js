function ParticleSystem(x, y, lifetime, type, sprite) {
  this.x = x;
  this.y = y;
  this.lifetime = lifetime;
  this.type = type;
  this.sprite = sprite;
  this.gameObjects = [];
  this.created = false;
  this.hasLife = true;

  if (this.lifetime == 0)
    this.hasLife = false;
}

ParticleSystem.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.lifetime <= 0) {
      currentLevel.removeParticleSystem(this);
    } else {
      this.lifetime -= delta;
    }
  }

  for (var i = 0;i < this.gameObjects.length;i++) {
    if (this.gameObjects[i]) {
      if (this.gameObjects[i].transparency - 0.01 > 0) {
        this.gameObjects[i].transparency -= 0.01;
      } else {
        this.gameObjects[i].transparency = 0;
      }
    }
  }

  if (!this.created) {
    for (var i = 0;i < 30;i++) {
      var particle = new Particle(this.sprite, this.x, this.y, getRandomArb(10, 100), getRandomArb(3, 10));
      particle.direction = new Vector(getRandomArb(-50, 50), getRandomArb(-50, 50));
      this.gameObjects.push(particle);
      currentLevel.addGameObject(particle);
    }
    this.created = true;
  }
};
