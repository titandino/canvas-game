/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let StartMenu = __webpack_require__(3);

const canvas = document.getElementById('game-canvas');
if (!canvas) {
  console.log('No canvas found.');
}

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 35;
exports.DEBUG = false;

let currentLevel = new StartMenu(); //TODO make this into a constructor
currentLevel.init();

exports.drawText = function(text, x, y, color, size, font, align) {
  ctx.fillStyle = color;
  ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
};

exports.getRandomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

exports.getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.switchLevel = function(newLevel) {
  currentLevel.unload();
  currentLevel = newLevel;
  currentLevel.init();
};

function update(delta) {
  currentLevel.updateObjects(delta);
  currentLevel.update(delta);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentLevel.renderObjects();
  currentLevel.render();
}

function main() {
  let now = Date.now();
  let delta = now - then;

  update(delta / 1000);
  render();

  then = now;
}

let then = Date.now();
setInterval(main, 1000 / FPS);

console.log('Set canvas exports.');
exports.canvas = canvas;
exports.currentLevel = currentLevel;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let Vector2 = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function Vector2(x, y) {
  this.x = x;
  this.y = y;
};

Vector2.prototype.normalize = function() {
  let mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
  if (mag != 0) {
    this.x /= mag;
    this.y /= mag;
  }
  return this;
};

Vector2.prototype.getMagnitude = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

Vector2.prototype.dot = function(vec) {
  return (this.x * vec.x) + (this.y * vec.y);
};

Vector2.prototype.add = function(vec) {
  this.x += vec.x;
  this.y += vec.y;
  return this;
};

Vector2.prototype.subtract = function(vec) {
  this.x -= vec.x;
  this.y -= vec.y;
  return this;
};

Vector2.prototype.mul = function(vec) {
  this.x *= vec.x;
  this.y *= vec.y;
  return this;
};

Vector2.prototype.multiplyByScalar = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
};

Vector2.prototype.getRotatedBy = function(rad) {
  return new Vector2(this.x * Math.cos(rad) - this.y * Math.sin(rad), this.x * Math.sin(rad) + this.y * Math.cos(rad));
};

Vector2.prototype.reflect = function (direction) {
  direction.multiplyByScalar(2 * (this.dot(direction)));
  this.subtract(direction);
  this.normalize();
  return this;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let Input = __webpack_require__(4);
let Level = __webpack_require__(5);
let Particle = __webpack_require__(7);
let Vector2 = __webpack_require__(2);

let ControlsMenu = __webpack_require__(11);
let Asteroids = __webpack_require__(9);

StartMenu.prototype = Object.create(Level.prototype);

module.exports = function StartMenu() {
  Level.call(this);

  this.timer = 1.0;
};

StartMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.logo = this.addGameObject(new GameObject('logo.png', Game.canvas.width / 2, Game.canvas.height / 2 - 100, 400, 2));
  this.playButton = this.addGameObject(new GameObject('play.png', Game.canvas.width / 2 - 200, Game.canvas.height / 2, 100, 2));
  this.controlsButton = this.addGameObject(new GameObject('controls.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2, 100, 2));
};

StartMenu.prototype.update = function(delta) {
  if (this.timer > 0)
    this.timer -= delta;
  if (this.timer <= 0) {
    this.spawnAsteroid();
    this.timer = 1.0;
  }
};

StartMenu.prototype.onMouseDown = function() {
  if (this.playButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new Asteroids());
  } else if (this.controlsButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new ControlsMenu());
  }
};

StartMenu.prototype.spawnAsteroid = function() {
  let dir = Game.getRandom(0, 5);
  let asteroid = new Particle('asteroid.png', 0, 0, Game.getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = canvas.width;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(-10, -50));
  } else {
    asteroid.x = canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = Game.getRandomFloat(-2, 2);
  this.addGameObject(asteroid);
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);

module.exports = {
  keysDown: [],
  mousePos: {x: 0, y: 0}
};

console.log(Game.canvas);

Game.canvas.addEventListener('mousedown', function(e) {
  exports.mousePos = getLocalMousePos(canvas, e);
  Game.currentLevel.onMouseDown();
}, false);

Game.canvas.addEventListener('mousemove', function(e) {
  mousePos = getLocalMousePos(canvas, e);
}, false);

function getLocalMousePos(canvas, e) {
  let rect = Game.canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / (rect.right - rect.left) * Game.canvas.width,
    y: (e.clientY - rect.top) / (rect.bottom - rect.top) * Game.canvas.height
  };
}

window.addEventListener('keydown', function(e) {
  exports.keysDown[e.keyCode] = true;
  switch(e.keyCode){
  case 37:
  case 39:
  case 38:
  case 40:
  case 32:
    e.preventDefault();
    break;
  default:
    break;
  }
}, false);

window.addEventListener('keyup', function(e) {
  exports.keysDown[e.keyCode] = false;
}, false);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function Level() {
  this.gameObjects = [];
  this.particleSystems = [];
};

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
  for (let i = 0;i < this.gameObjects.length;i++) {
    if (!this.gameObjects[i]) {
      this.gameObjects[i] = object;
      return object;
    }
  }
  this.gameObjects.push(object);
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
        this.gameObjects[i].updatePhysics(delta);
        this.gameObjects[i].update(delta);
      }
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
  this.gameObjects = [];
  this.particleSystems = [];
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let Particle = __webpack_require__(7);
let Vector2 = __webpack_require__(2);

module.exports = function ParticleSystem(sprite, x, y, life, numParticles, minSize, maxSize, minSpeed, maxSpeed, minX, maxX, minY, maxY, gravity) {
  this.x = x;
  this.y = y;
  this.lifetime = life;
  this.sprite = sprite;
  this.gameObjects = [];
  this.created = false;
  this.hasLife = true;
  this.numParticles = numParticles;
  this.minSize = minSize;
  this.maxSize = maxSize;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.minX = minX;
  this.maxX = maxX;
  this.minY = minY;
  this.maxY = maxY;
  this.gravity = gravity;

  if (this.lifetime == 0)
    this.hasLife = false;
};

ParticleSystem.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.lifetime <= 0) {
      Game.currentLevel.removeParticleSystem(this);
    } else {
      this.lifetime -= delta;
    }
  }

  for (let i = 0;i < this.gameObjects.length;i++) {
    if (this.gameObjects[i]) {
      if (this.gameObjects[i].transparency - 0.01 > 0) {
        this.gameObjects[i].transparency -= 0.01;
      } else {
        this.gameObjects[i].transparency = 0;
      }
    }
  }

  if (!this.created) {
    for (let i = 0;i < this.numParticles;i++) {
      let particle = new Particle(this.sprite, this.x, this.y, Game.getRandomFloat(this.minSize, this.maxSize));
      particle.velocity = new Vector2(Game.getRandomFloat(this.minX, this.maxX), Game.getRandomFloat(this.minY, this.maxY)).normalize();
      let speed = Game.getRandomFloat(this.minSpeed, this.maxSpeed);
      particle.velocity.multiplyByScalar(speed);
      if (this.gravity)
        particle.gravity = this.gravity;
      this.gameObjects.push(particle);
      Game.currentLevel.addGameObject(particle);
    }
    this.created = true;
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let GameObject = __webpack_require__(1);

Particle.prototype = Object.create(GameObject.prototype);

module.exports = function Particle(spriteFile, x, y, scale) {
  GameObject.call(this, spriteFile, x, y, scale);
  this.life = 0;
  this.hasLife = false;
  this.rotation = Game.getRandomFloat(-5, 5);
  this.deleteOnViewportExit = true;
};

Particle.prototype.setLife = function(life) {
  this.life = life;
  this.hasLife = true;
};

Particle.prototype.update = function(delta) {
  if (this.hasLife) {
    if (this.life <= 0) {
      this.markedForDeletion = true;
    } else {
      this.life -= delta;
    }
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let GameObject = __webpack_require__(1);

let ParticleSystem = __webpack_require__(6);

Asteroid.prototype = Object.create(GameObject.prototype);

module.exports = function Asteroid(x, y, scale) {
  GameObject.call(this, 'asteroid.png', x, y, scale);
  this.deleteOnViewportExit = true;
};

Asteroid.prototype.processHit = function() {
  Game.currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
  Game.currentLevel.score += Math.floor(100 - this.scale);
  if (this.scale >= 40) {
    for(let i = 0;i < Game.getRandom(2, 4);i++) {
      let asteroid = new Asteroid(this.x, this.y, this.scale / 2);
      asteroid.velocity = this.velocity.getRotatedBy(Game.getRandomFloat(-1, 1));
      Game.currentLevel.asteroids.push(Game.currentLevel.addGameObject(asteroid));
    }
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let GameObject = __webpack_require__(0);
let Vector2 = __webpack_require__(2);

let Ship = __webpack_require__(14);
let Asteroid = __webpack_require__(8);
let PowerUp = __webpack_require__(13);

Asteroids.prototype = Object.create(Level.prototype);

module.exports = function Asteroids() {
  Level.call(this);

  this.asteroids = [];
  this.spawnTime = 10;
  this.timer = 0;
  this.score = 0;
  this.wavesSpawned = 0;
};

Asteroids.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.player = this.addGameObject(new Ship('ship.png', Game.canvas.width / 2, Game.canvas.height / 2, 20));
  this.player.shield = this.addGameObject(new GameObject('#00FFFF', 0, 0, 50, 1));
  this.player.shield.visible = false;
};

Asteroids.prototype.update = function(delta) {
  if (this.timer > 0) {
    this.timer -= delta;
  } else {
    this.spawnWave();
    this.timer = this.spawnTime;
  }
};

Asteroids.prototype.increaseDifficulty = function() {
  if (this.spawnTime > 7)
    this.spawnTime--;
  else if (this.spawnTime > 4)
    this.spawnTime -= 0.5;
  else if (this.spawnTime > 2)
    this.spawnTime -= 0.2;
};

Asteroids.prototype.spawnWave = function() {
  this.wavesSpawned += 1;
  if (this.wavesSpawned % 5) {
    this.increaseDifficulty();
  }
  if (Game.getRandom(0, 100) < 50)
    this.spawnPowerUp();
  for(let i = 0;i < 5;i++) {
    this.spawnAsteroid();
  }
};

Asteroids.prototype.spawnPowerUp = function() {
  this.addGameObject(new PowerUp(Game.getRandom(0, this.player.powerups.length), Game.getRandom(50, canvas.width), Game.getRandom(50, canvas.height)));
};

Asteroids.prototype.spawnAsteroid = function() {
  let dir = Game.getRandom(0, 5);
  let asteroid = new Asteroid(0, 0, Game.getRandom(25, 75));
  if (dir <= 1) {
    asteroid.x = 0;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(10, 50));
  } else if (dir === 2) {
    asteroid.x = 0;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(10, 50), Game.getRandomFloat(-10, -50));
  } else if (dir === 3) {
    asteroid.x = canvas.width;
    asteroid.y = canvas.height;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(-10, -50));
  } else {
    asteroid.x = canvas.width;
    asteroid.y = 0;
    asteroid.velocity = new Vector2(Game.getRandomFloat(-10, -50), Game.getRandomFloat(10, 50));
  }
  asteroid.angularVelocity = Game.getRandomFloat(-2, 2);
  for (let i = 0;i < this.asteroids.length;i++) {
    if (!this.asteroids[i]) {
      this.asteroids[i] = this.addGameObject(asteroid);
      return;
    }
  }
  this.asteroids.push(this.addGameObject(asteroid));
};

Asteroids.prototype.render = function() {
  Game.drawText('Ship health: ' + this.player.health, 20, 20, '#00FF00');
  Game.drawText('Score: ' + this.score, 20, 32, '#00FF00');
  if (Game.DEBUG) {
    Game.drawText('Game object buffer len: ' + this.gameObjects.length, 20, 44, '#00FF00');
    Game.drawText('Game objects: ' + this.objectCount(), 20, 56, '#00FF00');
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let GameObject = __webpack_require__(1);

Bullet.prototype = Object.create(GameObject.prototype);

module.exports = function Bullet(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.deleteOnViewportExit = true;
};

Bullet.prototype.update = function() {
  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      if (this.rectCollide(Game.currentLevel.asteroids[i])) {
        Game.currentLevel.asteroids[i].processHit(i);
        Game.currentLevel.removeGameObject(this);
        Game.currentLevel.removeGameObject(Game.currentLevel.asteroids[i]);
        Game.currentLevel.asteroids[i] = null;
      }
    }
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let Level = __webpack_require__(5);
let Input = __webpack_require__(4);

let StartMenu = __webpack_require__(3);

ControlsMenu.prototype = Object.create(Level.prototype);

function ControlsMenu() {
  Level.call(this);
}

ControlsMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.controls = this.addGameObject(new GameObject('controlsbg.png', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height < Game.canvas.width ? Game.canvas.height : Game.canvas.width));
  this.backButton = this.addGameObject(new GameObject('back.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2 + 200, 100));
};

ControlsMenu.prototype.onMouseDown = function() {
  if (this.backButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new StartMenu());
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

let Level = __webpack_require__(5);
let Game = __webpack_require__(0);
let Input = __webpack_require__(4);
let GameObject = __webpack_require__(1);

let StartMenu = __webpack_require__(3);

LossMenu.prototype = Object.create(Level.prototype);

module.exports = function LossMenu(score) {
  Level.call(this);

  this.score = score;
};

LossMenu.prototype.init = function() {
  this.background = this.addGameObject(new GameObject('#000000', Game.canvas.width / 2, Game.canvas.height / 2, Game.canvas.height > Game.canvas.width ? Game.canvas.height : Game.canvas.width, -1));
  this.backButton = this.addGameObject(new GameObject('back.png', Game.canvas.width / 2 + 200, Game.canvas.height / 2 + 200, 100));
};

LossMenu.prototype.render = function() {
  Game.drawText('YOUR SHIP WAS DESTROYED', Game.canvas.width / 2, Game.canvas.height / 2 - 200, '#00FF00', '50px', 'Helvetica', 'center');
  Game.drawText('FINAL SCORE: ' + this.score, Game.canvas.width / 2, Game.canvas.height / 2, '#00FF00', '50px', 'Helvetica', 'center');
};

LossMenu.prototype.onMouseDown = function() {
  if (this.backButton.pointCollide(Input.mousePos.x, Input.mousePos.y)) {
    Game.switchLevel(new StartMenu());
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);
let GameObject = __webpack_require__(1);
let ParticleSystem = __webpack_require__(6);

PowerUp.TRISHOT = 0;
PowerUp.SHOT_SPEED = 1;
PowerUp.INVULNERABILITY = 2;

PowerUp.prototype = Object.create(GameObject.prototype);

module.exports = function PowerUp(type, x, y) {
  GameObject.call(this, this.getSpriteByType(type), x, y, 30);
  this.type = type;
};

PowerUp.prototype.update = function() {
  if (Game.currentLevel.player.rectCollide(this)) {
    Game.currentLevel.addParticleSystem(new ParticleSystem('#00FFFF', this.x, this.y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
    Game.currentLevel.player.powerups[this.type] = 15;
    Game.currentLevel.removeGameObject(this);
  }
};

PowerUp.prototype.getSpriteByType = function(type) {
  switch(type) {
  case 0:
    return 'trishot.png';
  case 1:
    return 'shotspeed.png';
  case 2:
    return 'invulnerability.png';
  default:
    return '#00FF00';
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

let Game = include('./engine/game');
let GameObject = __webpack_require__(1);
let ParticleSystem = __webpack_require__(6);
let Vector2 = __webpack_require__(2);

let PowerUp = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./powerups\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
let LossMenu = __webpack_require__(12);
let Bullet = __webpack_require__(10);

Ship.prototype = Object.create(GameObject.prototype);

module.exports = function Ship(sprite, x, y, scale) {
  GameObject.call(this, sprite, x, y, scale);
  this.health = 100;
  this.timeBetweenShots = 0.5;
  this.shotTimer = 0;
  this.turnSpeed = 3;
  this.speed = 80;
  this.powerups = [ 0, 0, 0 ];
  this.wrapViewport = true;
};

Ship.prototype.removeHealth = function(amount) {
  if (this.powerups[PowerUp.INVULNERABILITY] <= 0)
    this.health -= amount;
  if (this.health <= 0) {
    Game.switchLevel(new LossMenu(Game.currentLevel.score));
    this.health = -1;
  }
};

Ship.prototype.fireBullet = function() {
  let bulletOffset = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.scale);
  let bullet = new Bullet('#FF0000', this.x + bulletOffset.x, this.y + bulletOffset.y, 5);
  bullet.velocity = bulletOffset.normalize().multiplyByScalar(800);
  Game.currentLevel.addGameObject(bullet);
  if (this.powerups[PowerUp.TRISHOT] > 0) {
    let bulletOffset2 = new Vector2(Math.sin(this.rotation - 0.2), -Math.cos(this.rotation - 0.2)).multiplyByScalar(this.scale);
    let bullet2 = new Bullet('#FF0000', this.x + bulletOffset2.x, this.y + bulletOffset2.y, 5);
    bullet2.velocity = bulletOffset2.normalize().multiplyByScalar(800);
    Game.currentLevel.addGameObject(bullet2);
    let bulletOffset3 = new Vector2(Math.sin(this.rotation + 0.2), -Math.cos(this.rotation + 0.2)).multiplyByScalar(this.scale);
    let bullet3 = new Bullet('#FF0000', this.x + bulletOffset3.x, this.y + bulletOffset3.y, 5);
    bullet3.velocity = bulletOffset3.normalize().multiplyByScalar(800);
    Game.currentLevel.addGameObject(bullet3);
  }
  this.shotTimer = this.timeBetweenShots;
  if (this.powerups[PowerUp.SHOT_SPEED] > 0) {
    this.shotTimer /= 5;
  }
};

Ship.prototype.update = function(delta) {
  if (this.shotTimer > 0) {
    this.shotTimer -= delta;
  }

  for (let i = 0;i < this.powerups.length;i++) {
    if (this.powerups[i] > 0) {
      this.powerups[i] -= delta;
    }
  }

  this.shield.x = this.x;
  this.shield.y = this.y;
  if (this.powerups[PowerUp.INVULNERABILITY] > 5) {
    this.shield.visible = true;
    this.shield.transparency = 0.4;
  } else if (this.powerups[PowerUp.INVULNERABILITY] > 0) {
    this.shield.visible = true;
    if (this.shield.transparency > 0.4) {
      this.shield.incrementing = false;
    } else if (this.shield.transparency <= 0.1) {
      this.shield.incrementing = true;
    }
    this.shield.transparency += this.shield.incrementing ? delta / 2 : -(delta / 2);
  } else {
    this.shield.visible = false;
  }

  for(let i = 0;i < Game.currentLevel.asteroids.length;i++) {
    if (Game.currentLevel.asteroids[i]) {
      if (this.rectCollide(Game.currentLevel.asteroids[i])) {
        this.removeHealth(Game.getRandom(5, 9));
        Game.currentLevel.addParticleSystem(new ParticleSystem('asteroid.png', Game.currentLevel.asteroids[i].x, Game.currentLevel.asteroids[i].y, 2, 25, 5, 15, 40, 80, -50, 50, -50, 50));
        Game.currentLevel.removeGameObject(Game.currentLevel.asteroids[i]);
        Game.currentLevel.asteroids[i] = null;
      }
    }
  }

  const accelDamper = 0.60;
  const velDamper = 0.995;

  this.acceleration.x *= accelDamper;
  this.acceleration.y *= accelDamper;
  this.velocity.x *= velDamper;
  this.velocity.y *= velDamper;

  if (keysDown[32]) {
    if (this.shotTimer <= 0) {
      this.fireBullet();
    }
  }

  if (keysDown[68]) {
    this.rotation += this.turnSpeed * delta;
  } else if (keysDown[65]) {
    this.rotation -= this.turnSpeed * delta;
  }

  if (keysDown[87]) {
    let fireOffset = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.scale);
    this.acceleration = new Vector2(Math.sin(this.rotation), -Math.cos(this.rotation)).multiplyByScalar(this.speed);
    Game.currentLevel.addParticleSystem(new ParticleSystem('fire.png', this.x + fireOffset.x, this.y + fireOffset.y, 2, 2, 5, 15, 40, 80,
    (fireOffset.x * 10) - 50, (fireOffset.x * 10) + 50, (fireOffset.y * 10) - 50, (fireOffset.y * 10) + 50));
  } else if (keysDown[83]) {
    this.acceleration = new Vector2(-Math.sin(this.rotation), Math.cos(this.rotation)).multiplyByScalar(this.speed);
  }
};


/***/ })
/******/ ]);