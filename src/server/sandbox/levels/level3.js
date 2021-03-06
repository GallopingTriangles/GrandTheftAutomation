var vm = require('vm');

// next level
var level2 = require('./level2');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

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
  // case 1: success right turn
  // case 2: fail, invalid speed or engine input
  // case 3: fail, car crashed straight
  // case 4: fail, crash left
  // case 5: fail, stall at intersection

	// == TESTING USER INPUT LEVEL 3 ========================
  runTestSuite(function UserInputTestLevel3(t) {
  	
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

  	// == MAP CONDITIONAL TEST == //
    runTestSuite(function MapConditionalFalseTest(t) {
      // == NEW GTA SANDBOX == //
      var context = new gtaSandbox().create(userInput);
    	var turn = context.testTurn.value;
      var calls = context.testTurn.calls;

    	this.testTurnNotCalled = function() {
        t.assertTrue(
          calls === 0,
          'Expected function turn() to be called inside if statement, but got called outside if statement',
          function(error) {
          	setCase(3, error); // car is turning before or after intersection
          }
        );
    	};

    }); // END if (map.intersection === false) {...}

    // == CONDITIONAL TESTS == //
    runTestSuite(function ConditionalTest(t) {
      this.testConditionalPresence = function() {
        t.assertTrue(
          userInput.indexOf('if') !== -1,
          'Expected code to have an if statement, example: "if (map.intersection) { do something..."',
          function(error) {
            setCase(3, error);
          }
        );
      };

      this.testConditionalIntersectionPresence = function() {
        t.assertTrue(
          userInput.indexOf('map.intersection === true') !== -1,
          'Expected code to have an if statement with conditional: if (map.intersection === true) {...',
          function(error) {
            setCase(3, error);
          }
        );
      };
    });

    runTestSuite(function MapConditionalTrueTest(t) {
      // == NEW GTA SANDBOX == //
      var context = new gtaSandbox().mapTrue(userInput);
      var turn = context.testTurn.value;
      var calls = context.testTurn.calls;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls > 0,
          'Expected function turn() to be called, but got not called',
          function(error) {
          	setCase(3, error); // car is not turning at intersection
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once, but got called ' + calls,
          function(error) {
            if (turn === 'left') {
              setCase(4, error);
            } else {
            	setCase(3, error); // car is turning multiple times
            }
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got called with ' + turn,
          function(error) {
            setCase(3, error);
          }
        );
      };

      this.testTurnInputString = function() {
        t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() to be called with input type of string, but got called with input of type ' + typeof turn,
          function(error) {
          	setCase(3, error); // car is not turning at intersection
          }
        );
      };

      this.testInputValueLeftOrRight = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right',
          'Expected function turn() to be called with argument "left" or "right", but got called with ' + turn,
          function(error) {
            setCase(3, error);
          }
        );
      };

      this.testTurnInputValueRight = function() {
        t.assertTrue(
          turn === 'right',
          'Expected function turn() to be called with input value "right", but got input value ' + turn,
          function(error) {
            if (turn === 'left') {
              setCase(4, error);
            } else {
            	setCase(3, error); // car is not turning at intersetion
            }
          }
        );
      };

    });

  });

  // if user level is greater than level 2, run tests of next level
  if (req.body.level === 4 && req.body.phaser.case === 1) {
  	level2(req, res, next);
  } else {
  // else return phaser object
  	next();
  }

};

module.exports = level3;