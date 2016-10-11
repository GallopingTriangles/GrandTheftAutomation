var router = require('express').Router();
var userController = require('../controllers/userController.js');

/****************** ROUTER FOR '/users' ENDPOINT ***********************
** Within the '/users' endpoint are several routes associated to user ** 
** profiles (login, sign up, and logout). Each route accommodates     **
** specific HTTP request types, where corresponding controllers from  **
** userController.js are supplied to handle certain actions. Refer to **
** userController.js for more information.                            **
************************************************************************/

router.route('/')                 // handles routes with '/users/' endpoint
  .get(userController.getState);  // returns user's saved stuff after verification

router.route('/login')            // handles routes with '/users/login' endpoint
  .post(userController.login);    // logs user in and creates new session

router.route('/signup')           // handles routes with '/users/signup' endpoint
  .post(userController.signup);   // creates a new user by saving to the database

router.route('/logout')           // handles routes with '/users/logout' endpoint
  .get(userController.logout);    // logs out user by destroying session on database

module.exports = router;          // exports all routes