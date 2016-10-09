var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level5 = function(req, res, next) {

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
  // route(['left']) |or| route(['right'])
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn
	// case 2: fail, engine not on or speed 0
	// case 3: success, right turn
	// case 4: fail, crashed going straight

	// == TESTING USER INPUT LEVEL 5 ========================
	runTestSuite(function UserInputTestLevel5(t) {
  
  // USER INPUT
	var userInput = req.body.log;
  // == VIRTUAL MACHINE =================================
  var funcColor = 'var setColor = function(input) { testColor = input; };';
  var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
  var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
  var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
  var funcRoute = 'var route = function(input) { testRoute = input; };';

  // input for virtual machine
  var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + userInput;
  var script = new vm.Script(input);

  var setCaseCount = 1;
  var setCase = function(caseNo) {
  	if (setCaseCount === 1) {
      req.body.phaser.case = caseNo;
      setCaseCount++;
  	}
  };

  // == ENABLED TESTS == //
  runTestSuite(function EnabledInputTest(t) {

  });

  // == ROUTE TESTS == //
  runTestSuite(function RouteInputTest(t) {

  });

	});

	next();

};

module.exports = level5;
