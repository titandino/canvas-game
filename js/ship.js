Ship.prototype = new GameObject();

function Ship(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.health = 100;
}

Ship.prototype.update = function(delta) {
  if (keysDown[87]) {
    this.rotation += 2 * delta;
  } else if (keysDown[83]) {
    this.rotation -= 2 * delta;
  }

  if (keysDown[65]) {
    //this.velocity = new Vector2();
  } else if (keysDown[68]) {
    this.direction.x = 1;
  }

  if (this.getRightBound() >= canvas.width)
    this.x = canvas.width - this.sprite.width / 2;
  if (this.getLeftBound() <= 0)
    this.x = this.sprite.width / 2;
  if (this.getBottomBound() >= canvas.height)
    this.y = canvas.height - this.sprite.height / 2;
  if (this.getTopBound() <= 0)
    this.y = this.sprite.height / 2;
};
