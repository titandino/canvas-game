TestLevel.prototype = new Level();

var timer = 1;

function TestLevel() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('bg.png', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('player.png', canvas.width / 2, canvas.height / 2, 50));

  this.update = function(delta) {
    if (timer <= 0) {
      timer = 1;
      this.addParticleSystem(new ParticleSystem(this.player.x + 50, this.player.y, 2, 1, 'player.png'));
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
