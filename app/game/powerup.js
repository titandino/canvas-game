let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');
let ParticleSystem = require('./engine/particlesystem');

let PowerUp = module.exports = function(type, x, y) {
  GameObject.call(this, this.getSpriteByType(type), x, y, 30);
  this.type = type;
};

PowerUp.TRISHOT = 0;
PowerUp.SHOT_SPEED = 1;
PowerUp.INVULNERABILITY = 2;

PowerUp.prototype = Object.create(GameObject.prototype);

PowerUp.prototype.update = function() {
  if (Game.currentLevel.player.rectCollide(this)) {
    Game.currentLevel.addParticleSystem(new ParticleSystem('#00FFFF', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
    Game.currentLevel.player.powerups[this.type] = 15;
    Game.currentLevel.removeGameObject(this);
  }
};

PowerUp.prototype.getSpriteByType = function(type) {
  switch(type) {
  case 0:
    return 'trishot.png';
  case 1:
    return 'shotspeed.png';
  case 2:
    return 'invulnerability.png';
  default:
    return '#00FF00';
  }
};
