// EXAMPLE
var router = require('express').Router();
var testController = require('../controllers/testController');

router.route('/')
  .get(testController.get);

module.exports = router;