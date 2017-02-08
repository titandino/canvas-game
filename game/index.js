let Game = require('./engine/game');
let StartMenu = require('./startmenu');

module.exports = new Game(new StartMenu());
