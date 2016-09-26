// == ROUTES ===================================================
var router = require('express').Router();

var testController = require('../controllers/testController');
var user = require('./user');

// == test =====================================================
router.route('/test').get(testController.get);

// == user routes ==============================================
router.route('/user', user);

module.exports = router;