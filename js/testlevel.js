function TestLevel(args) {
  Level.call(this, args);

  this.background = this.addGameObject(new GameObject('bg.png', canvas.width / 2, canvas.height / 2));
  this.player = this.addGameObject(new GameObject('player.png', 190, 359));

  this.update = function(delta) {

  };

  this.render = function() {

  };

  this.onMouseDown = function() {
    if (this.mainMenuButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new StartMenuLevel());
    }
  };

  this.onMouseMove = function() {

  };
}
