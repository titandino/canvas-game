let Game = require('./game/engine/game');
let StartMenu = require('./game/startmenu');

console.log(StartMenu);
console.log(require('./game/startmenu'));
module.exports = new Game(new StartMenu());
