var router = require('express').Router();
var gameController = require('../controllers/gameController.js');
var sandbox = require('../middleware/sandbox.js');
var sandboxRoutes = require('../sandbox/sandboxRoutes.js');

/******************* ROUTER FOR '/game' ENDPOINT ***********************
** This router handles all HTTP requests to '/game/'.  ** 
**   **
**   **
**   **
**   **
************************************************************************/

router.route('/')
  .get(gameController.getGameState) // gets the user's saved game state of the code editor
  .post(sandboxRoutes, gameController.saveGameState)

// saves the user's game state of the code editor
// sandbox middleware parses user input and adds it to req.body


// router.put('/', gameController.updateGameState); // updates the user's game state of the code editor
/****************************************************************************
// Don't need a handler for PUT requests
// Send everything through POST request and it will automatically update the
// log in the database if it already exists
*****************************************************************************/

module.exports = router;