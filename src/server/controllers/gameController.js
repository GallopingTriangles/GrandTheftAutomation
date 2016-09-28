var db = require('../db/index.js');

module.exports = {

  saveGameState: (req, res, next) => {
    /* handles a POST request                             */
    /* store the state of the code editor into the db     */
    /* req should contain the level and user and commands */
    console.log('Received POST request to save game state');
    res.json('Received POST request to save game state'); // status code 200 for success
  },

  getGameState: (req, res, next) => {
    /* handles a GET request */
    /* returns the state of the game for that particular level and user */
    console.log('Received GET request to get game state');
    res.json('Received GET request to get game state'); // status code 200 for success
  },

  updateGameState: (req, res, next) => {
    /* handles a PUT request */
    /* updates the saved commands for user for a particular level
               to a set of new commands that the user has entered */
    console.log('Received PUT request to update game state');
    res.json('Received PUT request to update game state'); // status code 204 for success
  }
}