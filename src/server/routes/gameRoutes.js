var router = require('express').Router();
var gameController = require('../controllers/gameController.js');

router.get('/', gameController.getGameState); // gets the user's saved game state of the code editor

router.post('/', gameController.saveGameState); // saves the user's game state of the code editor

// router.put('/', gameController.updateGameState); // updates the user's game state of the code editor
/****************************************************************************
// Don't need a handler for PUT requests
// Send everything through POST request and it will automatically update the
// log in the database if it already exists
*****************************************************************************/

module.exports = router;