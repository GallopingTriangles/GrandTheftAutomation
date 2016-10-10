var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level6 = function(req, res, next) {

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
  // enable('route');
  // 
  // route(['left', 'right']);
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn followed by right turn
	// case 2: fail, didn't enable engine or speed invalid
	// case 3: fail, drove straight through the first intersection and crashed
	// case 4: fail, turned left at first intersection and drove straight through the second intersection
	// case 5: fail, turned right at first intersection and crashed
	// case 6: success, turned left at the second interstion into the park and then turned right on the path
	// case 7: fail, turned left at the second intersection into the park and then crashed straigt

  next();

};

module.exports = level6;