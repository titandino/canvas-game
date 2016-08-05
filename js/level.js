function Level() {
  this.gameObjects = [];
  this.particleSystems = [];
}

Level.prototype.addParticleSystem = function(ps) {
  this.particleSystems.push(ps);
  return ps;
};

Level.prototype.removeParticleSystem = function(ps) {
  var index = this.particleSystems.indexOf(ps);
  if (index) {
    for (var i = 0;i < this.particleSystems[index].gameObjects.length;i++) {
      if (this.particleSystems[index].gameObjects[i])
        this.removeGameObject(this.particleSystems[index].gameObjects[i]);
    }
    delete this.particleSystems[index];
  }
};

Level.prototype.addGameObject = function(object) {
  var freeSpace = false;
  for (var i = 0;i < this.gameObjects.length;i++) {
    if (!this.gameObjects[i]) {
      this.gameObjects[i] = object;
      freeSpace = true;
      break;
    }
  }
  if (!freeSpace) {
    this.gameObjects.push(object);
  }
  return object;
};

Level.prototype.removeGameObject = function(object) {
  var index = this.gameObjects.indexOf(object);
  if (index) {
    delete this.gameObjects[index];
  }
};

Level.prototype.updateObjects = function(delta) {
  if (this.gameObjects) {
    for (var i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i]) {
        this.gameObjects[i].updatePhysics(delta);
        this.gameObjects[i].update(delta);
      }
    }
  }
  if (this.particleSystems) {
    for (var i = 0;i < this.particleSystems.length;i++) {
      if (this.particleSystems[i])
        this.particleSystems[i].update(delta);
    }
  }
};

Level.prototype.renderObjects = function(ctx) {
  if (this.gameObjects) {
    for (var i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i]) {
        this.gameObjects[i].render(ctx);
      }
    }
  }
};

Level.prototype.unload = function() {
  if (this.gameObjects) {
    for (var i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i])
        this.removeGameObject(this.gameObjects[i]);
    }
  }
  if (this.particleSystems) {
    for (var i = 0;i < this.particleSystems.length;i++) {
      if (this.particleSystems[i])
        this.removeGameObject(this.particleSystems[i]);
    }
  }
};

Level.prototype.update = function() {

};

Level.prototype.render = function() {

};

Level.prototype.onMouseDown = function() {

};

Level.prototype.onMouseMove = function() {

};
