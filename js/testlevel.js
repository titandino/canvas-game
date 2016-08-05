TestLevel.prototype = new Level();

var timer = 0.2;

function TestLevel() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('bg.png', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('player.png', canvas.width / 2, canvas.height / 2, 50));

  this.update = function(delta) {
    if (timer <= 0) {
      timer = 0.2;
      //sprite, x, y, life, numParticles, minSize, maxSize, minSpeed, maxSpeed, minX, maxX, minY, maxY
      this.addParticleSystem(new ParticleSystem('particle.png', this.player.x + 50, this.player.y, 2, 50, 10, 20, 3, 20, -50, 50, -50, 50));
    } else {
      timer -= delta;
    }
    this.background.position = new Vector2(canvas.width / 2, canvas.height / 2);
  };

  this.onMouseDown = function() {

  };

  this.onMouseMove = function() {

  };
}
