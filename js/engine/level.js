function Level() {
  this.gameObjects = [];
  this.particleSystems = [];
}

Level.prototype.objectCount = function() {
  let num = 0;
  for (let i = 0;i < this.gameObjects.length;i++) {
    if (this.gameObjects[i]) {
      num++;
    }
  }
  return num;
};

Level.prototype.addParticleSystem = function(ps) {
  this.particleSystems.push(ps);
  return ps;
};

Level.prototype.removeParticleSystem = function(ps) {
  let index = this.particleSystems.indexOf(ps);
  if (index) {
    for (let i = 0;i < this.particleSystems[index].gameObjects.length;i++) {
      if (this.particleSystems[index].gameObjects[i])
        this.removeGameObject(this.particleSystems[index].gameObjects[i]);
    }
    this.particleSystems.splice(index, 1);
  }
};

Level.prototype.addGameObject = function(object) {
  let freeSpace = false;
  for (let i = 0;i < this.gameObjects.length;i++) {
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
  let index = this.gameObjects.indexOf(object);
  if (index) {
    this.gameObjects.splice(index, 1);
  }
};

Level.prototype.updateObjects = function(delta) {
  this.gameObjects.sort(function(a,b) { return a.zIndex - b.zIndex; });
  if (this.gameObjects) {
    for (let i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i]) {
        if (this.gameObjects[i].markedForDeletion) {
          this.removeGameObject(this.gameObjects[i]);
          continue;
        }
        this.gameObjects[i].updatePhysics(delta);
        this.gameObjects[i].update(delta);
      }
      // else {
      // }
    }
  }
  if (this.particleSystems) {
    for (let i = 0;i < this.particleSystems.length;i++) {
      if (this.particleSystems[i])
        this.particleSystems[i].update(delta);
    }
  }
};

Level.prototype.renderObjects = function() {
  if (this.gameObjects) {
    for (let i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i]) {
        this.gameObjects[i].render();
        this.gameObjects[i].renderExtra();
      }
    }
  }
};

Level.prototype.unload = function() {
  if (this.gameObjects) {
    for (let i = 0;i < this.gameObjects.length;i++) {
      if (this.gameObjects[i])
        this.removeGameObject(this.gameObjects[i]);
    }
  }
  if (this.particleSystems) {
    for (let i = 0;i < this.particleSystems.length;i++) {
      if (this.particleSystems[i])
        this.removeGameObject(this.particleSystems[i]);
    }
  }
};

Level.prototype.init = function() {

};

Level.prototype.update = function() {

};

Level.prototype.render = function() {

};

Level.prototype.onMouseDown = function() {

};

Level.prototype.onMouseMove = function() {

};
