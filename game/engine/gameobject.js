let Game = require('./game');
let Vector2 = require('./vector2');

const LOADED_IMAGES = [];

function imageLoaded(sprite) {
  for (let i = 0;i < LOADED_IMAGES.length;i++) {
    if (LOADED_IMAGES[i].src === sprite)
      return i;
  }
  return -1;
};

function keepImage(image) {
  if (!imageLoaded(image.src))
    LOADED_IMAGES.push(image);
}

module.exports = function GameObject(sprite, x, y, scale, zIndex) {
  if (sprite && !sprite.startsWith('#')) {
    if (imageLoaded(sprite) === -1) {
      let image = new Image();
      image.onload = keepImage(image);
      image.src = 'sprites/' + sprite;
      this.sprite = image;
    } else {
      this.sprite = LOADED_IMAGES[imageLoaded(sprite)];
    }
    this.hasSprite = true;
  } else {
    this.sprite = sprite;
    this.hasSprite = false;
  }
  this.scale = scale;
  this.x = x;
  this.y = y;
  this.rotation = 0;
  this.angularVelocity = 0;
  this.gravity = null;
  this.visible = true;
  this.hasMovement = true;
  this.transparency = 1;
  this.zIndex = zIndex || 0;
  this.wrapViewport = false;
  this.deleteOnViewportExit = false;

  this.acceleration = new Vector2(0, 0);
  this.velocity = new Vector2(0, 0);
};

GameObject.prototype.updatePhysics = function(delta) {
  if (this.hasMovement) {
    if (this.gravity) {
      this.velocity.add(this.gravity.multiplyByScalar(this.gravity, delta));
    }

    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.x += this.velocity.x * delta;
    this.y += this.velocity.y * delta;
  }
  this.rotation += this.angularVelocity * delta;
  if (this.wrapViewport) {
    if (this.getLeftBound() >= Game.canvas.width)
      this.x = 1;
    if (this.getRightBound() <= 0)
      this.x = Game.canvas.width - 1;
    if (this.getTopBound() >= Game.canvas.height)
      this.y = 1;
    if (this.getBottomBound() <= 0)
      this.y = Game.canvas.height - 1;
  }
  if (this.deleteOnViewportExit) {
    if (this.getLeftBound() >= Game.canvas.width)
      this.markedForDeletion = true;
    if (this.getRightBound() <= 0)
      this.markedForDeletion = true;
    if (this.getTopBound() >= Game.canvas.height)
      this.markedForDeletion = true;
    if (this.getBottomBound() <= 0)
      this.markedForDeletion = true;
  }
};

GameObject.prototype.update = function() {

};

GameObject.prototype.render = function() {
  if (this.visible) {
    ctx.globalAlpha = this.transparency;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    if (!this.hasSprite) {
      ctx.fillStyle = this.sprite;
      ctx.fillRect(-this.scale / 2, -this.scale / 2, this.scale, this.scale);
    } else {
      ctx.drawImage(this.sprite, -(this.scale / 2), -((this.scale * (this.sprite.height / this.sprite.width)) / 2), this.scale, this.scale * (this.sprite.height / this.sprite.width));
    }
    ctx.rotate(-this.rotation);
    ctx.translate(-this.x, -this.y);
    ctx.globalAlpha = 1;
  }
};

GameObject.prototype.renderExtra = function() {

};

GameObject.prototype.getWidth = function() {
  return this.scale;
};

GameObject.prototype.getHeight = function()  {
  if (this.hasSprite && this.sprite) {
    return this.scale * (this.sprite.height / this.sprite.width);
  } else {
    return this.scale;
  }
};

GameObject.prototype.getLeftBound = function() {
  return this.x - this.getWidth() / 2;
};

GameObject.prototype.getRightBound = function() {
  return this.x + this.getWidth() / 2;
};

GameObject.prototype.getTopBound = function() {
  return this.y - this.getHeight() / 2;
};

GameObject.prototype.getBottomBound = function() {
  return this.y + this.getHeight() / 2;
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
