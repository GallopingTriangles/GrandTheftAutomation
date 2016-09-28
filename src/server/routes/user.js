// == USER ROUTES ==============================================
var router = require('express').Router();

var userController = require('../controllers/userController');

// == auth routes ==============================================
router.route('/login').post(userController.login);
router.route('/signup').post(userController.signup);
router.route('/logout').get(userController.logout);

module.exports = router;