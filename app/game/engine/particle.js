let Game = require('./game');
let GameObject = require('./gameobject');

let Particle = module.exports = function(spriteFile, x, y, scale) {
  GameObject.call(this, spriteFile, x, y, scale);
  this.life = 0;
  this.hasLife = false;
  this.rotation = Game.getRandomFloat(-5, 5);
  this.deleteOnViewportExit = true;
};

Particle.prototype = Object.create(GameObject.prototype);

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
