// == USER ROUTES ==============================================
var router = require('express').Router();

var userController = require('../controllers/userController');

// == auth routes ==============================================
router.route('/login').get(userController.login);
router.route('/signup').get(userController.signup);
router.route('/logout').get(userController.logout);

module.exports = router;