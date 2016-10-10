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
  // enable('route');
  // 
  // route(['left', 'left']);
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn followed by left turn
	// case 2: fail, invalid engine or speed
	// case 3: fail, drove straight at first intersection
	// case 4: fail, turned left at first intersection but drove straight at second intersection
	// case 5: fail, turned right at first intersection
	// case 6: fail, turned left at first intersection and turned right at second intersection

var level7 = function(req, res, next) {

  next();

};

module.exports = level7;