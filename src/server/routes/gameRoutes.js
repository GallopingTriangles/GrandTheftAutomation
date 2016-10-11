var router = require('express').Router();
var gameController = require('../controllers/gameController.js');
var sandbox = require('../middleware/sandbox.js');
var sandboxRoutes = require('../sandbox/sandboxRoutes.js');

/******************* ROUTER FOR '/game' ENDPOINT ***********************
** This router handles all HTTP requests to '/game/'. Each route      ** 
** accommodates specific HTTP request types, where corresponding      **
** controllers from gameController.js are supplied to handle certain  **
** actions. Refer to gameController.js for more information.          **
************************************************************************/

// handles routes with '/game/' endpoint
router.route('/')
  // gets the user's saved game state of the code editor
  .get(gameController.getGameState)                 
  // sandboxRoutes middleware parses user input to be saved as user's game state in database
  .post(sandboxRoutes, gameController.saveGameState)

// exports route
module.exports = router;                            