function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Vector2.prototype.normalize = function() {
  var mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
  if (mag != 0) {
    this.x /= mag;
    this.y /= mag;
  }
};

Vector2.prototype.dot = function(vec) {
  return (this.x * vec.x) + (this.y * vec.y);
};

Vector2.prototype.add = function (vec) {
  this.x += vec.x;
  this.y += vec.y;
  return this;
};

Vector2.prototype.subtract = function (vec) {
  this.x -= vec.x;
  this.y -= vec.y;
  return this;
};

Vector2.prototype.multiplyByScalar = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
};

Vector2.prototype.reflect = function (direction) {
  direction.multiplyByScalar(2 * (this.dot(direction)));
  this.subtract(direction);
  this.normalize();
  return this;
};
