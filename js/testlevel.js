TestLevel.prototype = new Level();

var timer = 0.01;

function TestLevel() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('bg.png', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('player.png', canvas.width / 2, canvas.height / 2, 50));

  this.update = function(delta) {
    if (timer <= 0) {
      timer = 0.01;
      //sprite, x, y, life, numParticles, minSize, maxSize, minSpeed, maxSpeed, minX, maxX, minY, maxY
      this.addParticleSystem(new ParticleSystem('particle.png', mousePos.x, mousePos.y, 2, 3, 10, 20, 3, 20, -50, 50, -50, 50));
    } else {
      timer -= delta;
    }
    this.background.position = new Vector2(canvas.width / 2, canvas.height / 2);
  };

  this.onMouseDown = function() {
    this.addParticleSystem(new ParticleSystem('particle.png', mousePos.x, mousePos.y, 2, 100, 20, 30, 30, 100, -50, 50, -50, 50));
  };

  this.onMouseMove = function() {

  };

  this.render = function() {
    if (DEBUG) {
      drawText('Game object buffer len: ' + this.gameObjects.length, 20, 20, '#00FF00');
      drawText('Game objects: ' + this.objectCount(), 20, 32, '#00FF00');
    }
  };
}
