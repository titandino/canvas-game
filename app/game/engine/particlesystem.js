let Game = require('./game');
let Particle = require('./particle');
let Vector2 = require('./vector2');

let ParticleSystem = module.exports = function(sprite, x, y, life, numParticles, minSize, maxSize, minSpeed, maxSpeed, minX, maxX, minY, maxY, gravity) {
  this.x = x;
  this.y = y;
  this.lifetime = life;
  this.sprite = sprite;
  this.gameObjects = [];
  this.created = false;
  this.hasLife = true;
  this.numParticles = numParticles;
  this.minSize = minSize;
  this.maxSize = maxSize;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.minX = minX;
  this.maxX = maxX;
  this.minY = minY;
  this.maxY = maxY;
  this.gravity = gravity;

  if (this.lifetime == 0)
    this.hasLife = false;
};

ParticleSystem.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.lifetime <= 0) {
      Game.currentLevel.removeParticleSystem(this);
    } else {
      this.lifetime -= delta;
    }
  }

  for (let i = 0;i < this.gameObjects.length;i++) {
    if (this.gameObjects[i]) {
      if (this.gameObjects[i].transparency - 0.01 > 0) {
        this.gameObjects[i].transparency -= 0.01;
      } else {
        this.gameObjects[i].transparency = 0;
      }
    }
  }

  if (!this.created) {
    for (let i = 0;i < this.numParticles;i++) {
      let particle = new Particle(this.sprite, this.x, this.y, Game.getRandomFloat(this.minSize, this.maxSize));
      particle.velocity = new Vector2(Game.getRandomFloat(this.minX, this.maxX), Game.getRandomFloat(this.minY, this.maxY)).normalize();
      let speed = Game.getRandomFloat(this.minSpeed, this.maxSpeed);
      particle.velocity.multiplyByScalar(speed);
      if (this.gravity)
        particle.gravity = this.gravity;
      this.gameObjects.push(particle);
      Game.currentLevel.addGameObject(particle);
    }
    this.created = true;
  }
};
