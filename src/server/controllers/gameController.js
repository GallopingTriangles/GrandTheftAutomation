var db = require('../db/index.js');

module.exports = {

  saveGameState: (req, res, next) => {
    /* handles a POST request */
    /* store the state of the code editor into the db */
    /* req should contain the level and user and commands */
  },

  getGameState: (req, res, next) => {
    /* handles a GET request */
    /* returns the state of the game for that particular level and user */
  }
}