let Game = require('./engine/game');
let GameObject = require('./engine/gameobject');
let ParticleSystem = require('./engine/particlesystem');
let Vector2 = require('./engine/vector2');
let Input = require('./engine/input');

let Missile = require('./missile');
let PowerUp = require('./powerup');
let LossMenu = require('./lossmenu');
let Bullet = require('./bullet');

let Ship = module.exports = function(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.health = 100;
  this.timeBetweenShots = 0.5;
  this.shotTimer = 0;
  this.missileTimer = 0;
  this.turnSpeed = 3;
  this.speed = 80;
  this.powerups = [ 0, 0, 0, 0 ];
  this.wrapViewport = true;
};

Ship.prototype = Object.create(GameObject.prototype);

Ship.prototype.removeHealth = function(amount) {
  if (this.powerups[PowerUp.INVULNERABILITY] <= 0)
    this.health -= amount;
  if (this.health <= 0) {
    Game.switchLevel(new LossMenu(Game.currentLevel.score));
    this.health = -1;
  }
};

Ship.prototype.fireMissile = function() {
  let missileOffset = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.scale);
  Game.currentLevel.addGameObject(new Missile(this.x + missileOffset.x, this.y + missileOffset.y, 30));
  this.missileTimer = 6;
  if (this.powerups[PowerUp.SHOT_SPEED] > 0) {
    this.missileTimer /= 2;
  }
};

Ship.prototype.fireBullet = function() {
  let bulletOffset = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.scale);
  let bullet = new Bullet('#FF0000', this.x + bulletOffset.x, this.y + bulletOffset.y, this.powerups[PowerUp.BULLETSIZE] > 0 ? 15 : 5);
  bullet.velocity = bulletOffset.normalize().multiplyByScalar(800);
  Game.currentLevel.addGameObject(bullet);
  if (this.powerups[PowerUp.TRISHOT] > 0) {
    let bulletOffset2 = new Vector2(Math.sin(this.rotation - 0.2), -Math.cos(this.rotation - 0.2)).multiplyByScalar(this.scale);
    let bullet2 = new Bullet('#FF0000', this.x + bulletOffset2.x, this.y + bulletOffset2.y, this.powerups[PowerUp.BULLETSIZE] > 0 ? 15 : 5);
    bullet2.velocity = bulletOffset2.normalize().multiplyByScalar(800);
    Game.currentLevel.addGameObject(bullet2);
    let bulletOffset3 = new Vector2(Math.sin(this.rotation + 0.2), -Math.cos(this.rotation + 0.2)).multiplyByScalar(this.scale);
    let bullet3 = new Bullet('#FF0000', this.x + bulletOffset3.x, this.y + bulletOffset3.y, this.powerups[PowerUp.BULLETSIZE] > 0 ? 15 : 5);
    bullet3.velocity = bulletOffset3.normalize().multiplyByScalar(800);
    Game.currentLevel.addGameObject(bullet3);
  }
  if (this.missileTimer-- <= 0) {
    this.fireMissile();
  }
  this.shotTimer = this.timeBetweenShots;
  if (this.powerups[PowerUp.SHOT_SPEED] > 0) {
    this.shotTimer /= 5;
  }
};

Ship.prototype.update = function(delta) {
  if (this.shotTimer > 0) {
    this.shotTimer -= delta;
  }

  if (this.missileTimer > 0) {
    this.missileTimer -= delta;
  }

  for (let i = 0;i < this.powerups.length;i++) {
    if (this.powerups[i] > 0) {
      this.powerups[i] -= delta;
    }
  }

  this.shield.x = this.x;
  this.shield.y = this.y;
  if (this.powerups[PowerUp.INVULNERABILITY] > 5) {
    this.shield.visible = true;
    this.shield.transparency = 0.4;
  } else if (this.powerups[PowerUp.INVULNERABILITY] > 0) {
    this.shield.visible = true;
    if (this.shield.transparency > 0.4) {
      this.shield.incrementing = false;
    } else if (this.shield.transparency <= 0.1) {
      this.shield.incrementing = true;
    }
    this.shield.transparency += this.shield.incrementing ? delta / 2 : -(delta / 2);
  } else {
    this.shield.visible = false;
  }

  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      if (this.rectCollide(Game.currentLevel.asteroids[i])) {
        this.removeHealth(Game.getRandom(5, 9));
        Game.currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', Game.currentLevel.asteroids[i].x, Game.currentLevel.asteroids[i].y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
        Game.currentLevel.removeGameObject(Game.currentLevel.asteroids[i]);
        Game.currentLevel.asteroids[i] = null;
      }
    }
  }

  const accelDamper = 0.60;
  const velDamper = 0.995;

  this.acceleration.x *= accelDamper;
  this.acceleration.y *= accelDamper;
  this.velocity.x *= velDamper;
  this.velocity.y *= velDamper;

  if (Input.keysDown[32]) {
    if (this.shotTimer <= 0) {
      this.fireBullet();
    }
  }

  if (Input.keysDown[68]) {
    this.rotation += this.turnSpeed * delta;
  } else if (Input.keysDown[65]) {
    this.rotation -= this.turnSpeed * delta;
  }

  if (Input.keysDown[87]) {
    let fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale);
    this.acceleration = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.speed);
    Game.currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 2, 2, 5, 15, 40, 80,
    (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
  } else if (Input.keysDown[83]) {
    this.acceleration = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.speed);
  }
};
