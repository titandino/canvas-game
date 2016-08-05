TestLevel.prototype = new Level();
TestLevel.prototype.constructor = TestLevel;
TestLevel.prototype.parent = Level.prototype;

function TestLevel() {
  Level.call(this);

  this.background = this.addGameObject(new GameObject('bg.png', canvas.width / 2, canvas.height / 2, canvas.width));
  this.player = this.addGameObject(new GameObject('player.png', canvas.width / 2, canvas.height / 2, 50));

  this.update = function(delta) {
    //console.log('updating..');
    this.background.position = new Vector2(canvas.width / 2, canvas.height / 2);
  };

  this.onMouseDown = function() {

  };

  this.onMouseMove = function() {

  };
}
