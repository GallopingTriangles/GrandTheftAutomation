var router = require('express').Router();
var gameController = require('../controllers/gameController.js');
var sandbox = require('../middleware/sandbox.js');

router.get('/', gameController.getGameState); // gets the user's saved game state of the code editor

// saves the user's game state of the code editor
// sandbox middleware parses user input and adds it to req.body
router.post('/', sandbox, gameController.saveGameState); 

// router.put('/', gameController.updateGameState); // updates the user's game state of the code editor
/****************************************************************************
// Don't need a handler for PUT requests
// Send everything through POST request and it will automatically update the
// log in the database if it already exists
*****************************************************************************/

module.exports = router;