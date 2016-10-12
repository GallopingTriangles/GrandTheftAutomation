var router = require('express').Router();
var userController = require('../controllers/userController.js');

/****************** ROUTER FOR '/users' ENDPOINT ***********************
** Within the '/users' endpoint are several routes associated to user ** 
** profiles (login, sign up, and logout). Each route accommodates     **
** specific HTTP request types, where corresponding controllers from  **
** userController.js are supplied to handle certain actions. Refer to **
** userController.js for more information.                            **
************************************************************************/

// handles routes with '/users/login' endpoint
router.route('/login')       
  // logs user in and creates new session to be store in database    
  .post(userController.login);    

// handles routes with '/users/signup' endpoint
router.route('/signup')           
  // creates a new user by saving information to the database
  .post(userController.signup);   

// handles routes with '/users/logout' endpoint
router.route('/logout')      
  // logs out user by destroying session on database     
  .get(userController.logout);    

// exports all routes
module.exports = router;          