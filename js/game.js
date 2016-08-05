var canvas = document.getElementById('game-canvas');
if (!canvas) {
  console.log('No canvas found.');
}

var FPS = 60;

function update(delta) {

}

function render() {
  
}

function main() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
}

var then = Date.now();
setInterval(main, 1000/FPS);
