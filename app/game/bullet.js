let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');

let Bullet = module.exports = function(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.deleteOnViewportExit = true;
};

Bullet.prototype = Object.create(GameObject.prototype);

Bullet.prototype.update = function() {
  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      if (this.rectCollide(Game.currentLevel.asteroids[i])) {
        Game.currentLevel.asteroids[i].processHit(i);
        Game.currentLevel.removeGameObject(this);
        Game.currentLevel.removeGameObject(Game.currentLevel.asteroids[i]);
        Game.currentLevel.asteroids[i] = null;
      }
    }
  }
};
