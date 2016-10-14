var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

var level9 = function(req, res, next) {

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
	// case 1: success
	// case: 2 // fail: [RIGHT, LEFT] (crash into the obstacle instead of u-turning)
	// case: 3 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT]
	// case: 4 // fail: BUGGY CASE, DO NOT USE [RIGHT, LEFT, U-TURN, LEFT] // THIS CASE IS BUGGY SO DO NOT USE IT
	// case: 5 // fail: [RIGHT, LEFT, U-TURN, RIGHT, RIGHT]
	// case: 6 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, STRAIGHT]
	// case: 7 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, LEFT]
	// case: 8 // fail: [LEFT, STRAIGHT]
	// case: 9 // fail: [LEFT, LEFT]
	// case: 10 // fail: ENGINE IS NOT ENABLED

  // == TESTING USER INPUT LEVEL 9 ========================
	runTestSuite(function UserInputTestLevel9(t) {
	  // USER INPUT
		var userInput = req.body.log;

	  var setCaseCount = 1;
	  var setCase = function(caseNo, errorMessage) {
	  	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
        req.body.bugs.push(errorMessage);
	      setCaseCount++;
	  	}
	  };
    
    // == CONDITIONAL TESTS == //
    runTestSuite(function ConditionalTest(t) {
      this.testThreeConditionalsPresent = function() {
      	var input = userInput;
      	var count = 0;
      	var pos = input.indexOf('if');
      	while (pos !== -1) {
      		count++;
      		pos = input.indexOf('if', pos + 1);
      	}
      	t.assertTrue(
          count === 3,
          'Expected code to have three if statements, but got ' + count + ' if statement(s)',
          function(error) {
          	setCase(2, error);
          }
      	);
      };

      this.testConditionalSensorPresence = function() {
        t.assertTrue(
          userInput.indexOf('sensor.front === true') !== -1,
          'Expected code to have an if statement with conditional: (sensor.front === true) {...',
          function(error) {
          	setCase(10, error);
          }
        );
      };
    });

    // == CONDITIONAL SENSOR TEST == //
    runTestSuite(function ConditionalSensorTest(t) {
    	// == NEW GTA SANDBOX == //
      var context = new gtaSandbox().sensorTrue(userInput);

    	var turn = context.testTurn.value;
    	var calls = context.testTurn.calls;

    	this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Expected function turn() to be called in sensor.front if statement, but got ' + calls + ' calls',
          function(error) {
          	setCase(10, error);
          }
        );
    	};

    	this.testTurnCalledWithArgument = function() {
    	  t.assertTrue(
    	    turn,
    	    'Expected function turn() to be called with an argument, but got ' + turn,
    	    function(error) {
    	      setCase(10, error);
    	    }
    	  );
    	};

    	this.testTurnInputString = function() {
    		t.assertTrue(
    	    typeof turn === 'string',
    	    'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
    	    function(error) {
    	    	setCase(10, error);
    	    }
    		);
    	};

    	this.testTurnInputValue = function() {
    	  t.assertTrue(
    	    turn === 'left' || turn === 'right' || turn === 'u-turn',
    	    'Expected function turn() argument to have value "left", "right" or "u-turn", but got value ' + turn,
    	    function(error) {
    	    	setCase(10, error);
    	    }
    	  );
    	};

    	this.testTurnInputValueLeft = function() {
    	  t.assertTrue(
    	    turn === 'u-turn',
    	    'Expected function turn() argument to have value "u-turn", but got value ' + turn,
    	    function(error) {
    	    	setCase(10, error);
    	    }
    	  );
    	};

    });

	});

  next();

};

module.exports = level9;