function GameObject(sprite, x, y) {
  this.sprite = new Image();
  this.sprite.src = 'sprites/' + spriteFile;
  this.x = x;
  this.y = y;
  this.visible = true;
  this.hasMovement = true;

  this.direction = new Vector2(0.0, 0.0);
  this.speed = 0;
}

GameObject.prototype.updatePhysics = function(delta) {
  if (this.hasMovement) {
    this.x += this.direction.x * this.speed * delta;
    this.y += this.direction.y * this.speed * delta;
  }
};

GameObject.prototype.update = function() {

};

GameObject.prototype.render = function(context) {
  if (this.draw) {
    this.renderExtra(context);
    context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
  }
};

GameObject.prototype.getLeftBound = function() {
  return this.x - this.sprite.width / 2;
};

GameObject.prototype.getRightBound = function() {
  return this.x + this.sprite.width / 2;
};

GameObject.prototype.getTopBound = function() {
  return this.y - this.sprite.height / 2;
};

GameObject.prototype.getBottomBound = function() {
  return this.y + this.sprite.height / 2;
};

GameObject.prototype.pointCollide = function(x, y) {
  if (this.getLeftBound() <= x && x <= this.getRightBound() &&
      this.getTopBound() <= y && y <= this.getBottomBound()) {
    return true;
  } else {
    return false;
  }
};

GameObject.prototype.rectCollide = function(otherObject) {
  if (this.getLeftBound() <= otherObject.getRightBound() &&
      otherObject.getLeftBound() <= this.getRightBound() &&
      this.getTopBound() <= otherObject.getBottomBound() &&
      otherObject.getTopBound() <= this.getBottomBound()) {
    return true;
  } else {
    return false;
  }
};
