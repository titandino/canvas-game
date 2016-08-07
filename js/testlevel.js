TestLevel.prototype = new Level();

var timer = 0.01;

function TestLevel() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('#000000', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('#00FF00', canvas.width / 2, canvas.height / 2, 50));
  this.player.angularVelocity = 1;

  this.update = function(delta) {
    if (timer <= 0) {
      timer = 0.01;
      this.addParticleSystem(new ParticleSystem('particle.png', mousePos.x, mousePos.y, 2, 3, 10, 25, 15, 50, -50, 50, -50, 50));
    } else {
      timer -= delta;
    }
  };

  this.onMouseDown = function() {
    this.addParticleSystem(new ParticleSystem('particle.png', mousePos.x, mousePos.y, 2, 100, 30, 50, 45, 100, -50, 50, -50, 50));
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
