let Game = require('./game/engine/game');
let StartMenu = require('./game/startmenu');

module.exports = new Game(new StartMenu());
