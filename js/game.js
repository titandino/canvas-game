var canvas = document.getElementById('game-canvas');
if (!canvas) {
  console.log('No canvas found.');
}

var ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var FPS = 60;
var currentLevel = new TestLevel();

var keysDown = [];
var mousePos = {x: 0, y: 0};

canvas.addEventListener('mousedown', function(e) {
  mousePos = getLocalMousePos(canvas, e);
  currentLevel.onMouseDown();
}, false);

canvas.addEventListener('mousemove', function(e) {
  mousePos = getLocalMousePos(canvas, e);
}, false);

function getLocalMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

canvas.addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

canvas.addEventListener('keyup', function (e) {
  keysDown[e.keyCode] = false;
}, false);

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '12px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function switchLevel(newLevel) {
  currentLevel.unload();
  currentLevel = newLevel;
}

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
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
}

var then = Date.now();
setInterval(main, 1000 / FPS);
