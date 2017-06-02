Missile.prototype = Object.create(GameObject.prototype);

function Missile(x, y, scale) {
  GameObject.call(this, 'missile.png', x, y, scale);
  this.deleteOnViewportExit = true;
  this.target = null;
  this.retarget();
}

Missile.prototype.retarget = function() {
  let newTarget = null;
  let closest = 50000000;
  for(let i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      let dist = ((this.x - currentLevel.asteroids[i].x) * (this.x - currentLevel.asteroids[i].x)) + ((this.y - currentLevel.asteroids[i].y) * (this.y - currentLevel.asteroids[i].y));
      if (dist < closest) {
        newTarget = currentLevel.asteroids[i];
        closest = dist;
      }
    }
  }
  this.target = newTarget;
};

Missile.prototype.update = function() {
  for(let i = 0;i < currentLevel.asteroids.length;i++) {
    if (currentLevel.asteroids[i]) {
      if (this.rectCollide(currentLevel.asteroids[i])) {
        currentLevel.asteroids[i].processHit(i);
        currentLevel.removeGameObject(this);
        currentLevel.removeGameObject(currentLevel.asteroids[i]);
        currentLevel.asteroids[i] = null;
        this.target = null;
      }
    }
  }

  this.retarget();

  let cosine, sine, angle;
  let currentAim = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation)).normalize();
  let newAim = new Vector2(this.target.x, this.target.y).subtract(new Vector2(this.x, this.y)).normalize();

  cosine = currentAim.x * newAim.x + currentAim.y * newAim.y;
  sine = currentAim.x * newAim.y - currentAim.y * newAim.x;
  angle = Math.acos(cosine);

  if (sine < 0) {
    angle *= -angle;
  }
  angle += 3.1415;

  if (angle >= 0) {
    this.rotation += 0.05;
  } else {
    this.rotation -= 0.05;
  }

  this.velocity = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(200);

  let fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale / 1.9);
  currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 0.4, 1, 5, 15, 40, 80,
  (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
};
