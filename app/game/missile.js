let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');
let ParticleSystem = require('./engine/particlesystem');
let Vector2 = require('./engine/vector2');

let Missile = module.exports = function(x, y, scale) {
  GameObject.call(this, 'missile.png', x, y, scale);
  this.deleteOnViewportExit = true;
  this.target = null;
  this.retargetTimer = 0;
};

Missile.prototype = Object.create(GameObject.prototype);

Missile.prototype.retarget = function() {
  let newTarget = null;
  let closest = 50000000;
  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      let dist = ((this.x - Game.currentLevel.asteroids[i].x) * (this.x - Game.currentLevel.asteroids[i].x)) + ((this.y - Game.currentLevel.asteroids[i].y) * (this.y - Game.currentLevel.asteroids[i].y));
      if (dist < closest) {
        newTarget = Game.currentLevel.asteroids[i];
        closest = dist;
      }
    }
  }
  this.target = newTarget;
};

Missile.prototype.update = function(delta) {
  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      if (this.rectCollide(Game.currentLevel.asteroids[i])) {
        Game.currentLevel.asteroids[i].processHit(i);
        Game.currentLevel.removeGameObject(this);
        Game.currentLevel.removeGameObject(Game.currentLevel.asteroids[i]);
        Game.currentLevel.asteroids[i] = null;
        this.target = null;
      }
    }
  }

  if (this.retargetTimer <= 0) {
    this.retarget();
    this.retargetTimer = 2;
  } else {
    this.retargetTimer -= delta;
  }

  let cosine, sine, angle;
  let currentAim = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation)).normalize();
  let newAim = this.target ? new Vector2(this.target.x, this.target.y).subtract(new Vector2(this.x, this.y)).normalize() : new Vector2(0, 0);

  cosine = currentAim.x * newAim.x + currentAim.y * newAim.y;
  sine = currentAim.x * newAim.y - currentAim.y * newAim.x;
  angle = Math.acos(cosine);

  if (sine < 0) {
    angle *= -angle;
  }
  angle += Math.PI;

  if (angle >= 0) {
    this.rotation += 0.05;
  } else {
    this.rotation -= 0.05;
  }

  this.velocity = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(200);

  let fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale / 1.9);
  Game.currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 0.4, 1, 5, 15, 40, 80,
  (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
};
