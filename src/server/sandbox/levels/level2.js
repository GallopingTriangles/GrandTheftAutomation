var vm = require('vm');

// next level
var level3 = require('./level3');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level2 = function(req, res, next) {
  
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
  // if (map.intersection === true) {
  //   turn('right');
  // }
  //
	// ======================================================

	// == TESTING USER INPUT LEVEL 2 ========================
  runTestSuite(function UserInputTest(t) {
  	
  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    var funcTurn = 'var turn = function(input) { testTurn = input; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + userInput;

  	// == TURN TESTS == //
  	runTestSuite(function TurnInputTest(t) {

  	});

  	// == CONDITIONAL TESTS == //
  	runTestSuite(function IntersectionConditionalTest(t) {
      
  	});

  });

  req.body.phaser.lorenzo = 'dit is een test van lorenzo';

  next();
};

module.exports = level2;