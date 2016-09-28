var router = require('express').Router();
var userController = require('../controllers/userController.js');

router.get('/', userController.verify, userController.getState); // returns user's saved stuff after verification

router.post('/login', userController.login); // authenticates the user when loggin in

router.post('/signup', userController.signup); // checks and creates a new user to the database

router.get('/logout', userController.logout); // wipes the session and logs the user out

module.exports = router;