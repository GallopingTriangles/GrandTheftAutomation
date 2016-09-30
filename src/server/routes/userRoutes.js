var router = require('express').Router();
var userController = require('../controllers/userController.js');

router.route('/')
  .get(userController.getState); // returns user's saved stuff after verification

router.route('/login')
  .post(userController.login); // authenticates the user when loggin in

router.route('/signup')
  .post(userController.signup); // checks and creates a new user to the database

router.route('/logout')
  .get(userController.logout); // wipes the session and logs the user out

module.exports = router;