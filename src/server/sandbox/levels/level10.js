var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

	// == EXPECTED USER INPUT ===============================
	// 
	// enable('engine');
	//
	// setColor('white / black / red / blue');
  // 
  // setSpeed(100);
  //
  // enable('sensor');
  //
  // enable('gps');
  // 
  // WRITE MORE STUFF HERE 
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, 
	// case 2: fail, invalid engine or speed

var level10 = function(req, res, next) {
  
  console.log('IN LEVEL 10');

  next();

};

module.exports = level10;

