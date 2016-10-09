var vm = require('vm');

// next level
var level4 = require('./level4');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level3 = function(req, res, next) {
  
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

	// == TESTING USER INPUT LEVEL 3 ========================
  runTestSuite(function UserInputTestLevel3(t) {
  	
  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    var funcTurn = 'var turn = function(input) { testTurn = input; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + userInput;
    var script = new vm.Script(input);

  	// == TURN TESTS == //
  	runTestSuite(function TurnInputTest(t) {
      // sandbox for virtual machine
      var sandbox = {
      	sensor: {
          front: false
      	},
      	testEnable: [],
      	testTurn: undefined
      };

      var context = new vm.createContext(sandbox);
      script.runInContext(context);

      // console.log(context);
      var turn = context.testTurn;

      // test if the turn is called and set
      this.testTurnDefined = function() {
        t.assertTrue(
          turn,
          'Expected turn to be called, but got undefined'
          // ADD FAIL CALLBACK
        );
      };

      // test if turn input is of data type string
      this.testTurnString = function() {
        t.assertString(
          turn,
          'turn'
          // ADD FAIL CALLBACK
        );
      };

  	});

  	// == CONDITIONAL TESTS == //
  	runTestSuite(function IntersectionConditionalTest(t) {
      
  	});

  });

  // if user level is greater than level 2, run tests of next level
  if (req.body.level > 3) {
  	level4(req, res, next);
  } else {
  // else return phaser object
  	next();
  }

};

module.exports = level3;