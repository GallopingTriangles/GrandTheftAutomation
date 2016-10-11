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
  // if (gps.intersection === 'left') {
  //   turn('left');
  // }
  //
  // if (gps.intersection === 'right') {
  //   turn('right');
  // }
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, ROUTE left, right, right, left (left => left, right => right)
	// case 2: fail, invalid engine or speed input // CHANGE IN PHASER
	// case 3: EASTER EGG, lower route // CHANGE IN PHASER
	// case 4: drove straigt through the first intersection
	// case 5: turned left then straight 
	// case 6: fail left left
	// case 7: fail left right straight
	// case 8: fail left right left
	// case 9: fail left right right straight
	// case 10: fail left right right right
	// case 11: fail right straight
	// case 12: right right
	// case 13: fail right left straight 
	// case 14: fail right left right
	// case 15: right left left straight 
	// case 16: fail right left left left

var level8 = function(req, res, next) {

	next();

};

module.exports = level8;