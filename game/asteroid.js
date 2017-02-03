let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');

let ParticleSystem = require('./engine/particlesystem');

Asteroid.prototype = Object.create(GameObject.prototype);

module.exports = function Asteroid(x, y, scale) {
  GameObject.call(this, 'asteroid.png', x, y, scale);
  this.deleteOnViewportExit = true;
};

Asteroid.prototype.processHit = function() {
  Game.currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
  Game.currentLevel.score += Math.floor(100 - this.scale);
  if (this.scale >= 40) {
    for(let i = 0;i < Game.getRandom(2, 4);i++) {
      let asteroid = new Asteroid(this.x, this.y, this.scale / 2);
      asteroid.velocity = this.velocity.getRotatedBy(Game.getRandomFloat(-1, 1));
      Game.currentLevel.asteroids.push(Game.currentLevel.addGameObject(asteroid));
    }
  }
};
