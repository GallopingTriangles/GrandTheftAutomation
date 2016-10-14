var vm = require('vm');

// next level
var level9 = require('./level9');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

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

  // == TESTING USER INPUT LEVEL 8 ========================
	runTestSuite(function UserInputTestLevel8(t) {
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

    // == ENABLED TESTS == //
	  runTestSuite(function EnabledGpsInputTest(t) {
	  	// == NEW GTA SANDBOX == //
      var context = new gtaSandbox().create(userInput);

      var enabled = context.testEnabled.values;
      var calls = context.testEnabled.calls;

      this.testEnabledCalledThreeTimes = function() {
        t.assertTrue(
          calls === 3,
          'Expected function enabled() to be called 3 times, but got called ' + calls + ' time(s)',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testEnabledCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected function enabled() to be called with an argument, but got ' + enabled[2],
          function(error) {
            setCase(4, error);
          }
        );
      };

      this.testEnabledInputTypeString = function() {
        t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected function enabled() to be called with an argument of type string, but got called with type ' + typeof enabled[2],
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testEnabledInputValueGps = function() {
        t.assertTrue(
          enabled[2] === 'gps',
          'Expected function enabled() to be called with argument "gps", but got called with ' + enabled[2],
          function(error) {
          	setCase(4, error);
          }
        );
      };
	  });

    // == CONDITIONAL TESTS == //
	  runTestSuite(function ConditionalTest(t) {
      // == NEW GTA SANDBOX == //
      var context = new gtaSandbox().create(userInput);

      var calls = context.testTurn.calls;

      this.testTurnNotCalledOutsideConditional = function() {
        t.assertTrue(
          calls === 0,
          'Expected function turn() not to be called outside if statement, but got called ' + calls + ' time(s)',
          function(error) {
          	setCase(2, error);
          }
        );
      };

      this.testConditionalPresence = function() {
        t.assertTrue(
          userInput.indexOf('if') !== -1,
          'Expected code to have an if statement, example: "if (gps.intersection) { do something... }"',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testConditionalLeftOrRightPresence = function() {
      	t.assertTrue(
          userInput.indexOf("gps.intersection === 'left'") !== -1 || userInput.indexOf("gps.intersection === 'right'") !== -1,
          'Expect code to have an if statement with conditional: if (gps.intersection === "left") {.. or if (gps.intersection === "right") {..',
          function(error) {
            setCase(4, error);
          }
      	);
      };

      this.testTwoConditionalsPresent = function() {
        var input = userInput;
        var count = 0;
        var pos = input.indexOf('if');
        while (pos !== -1) {
        	count++;
        	pos = input.indexOf('if', pos + 1);
        }
        t.assertTrue(
          count >= 2,
          'Expected code to have two if statements, but got ' + count + ' if statement(s)',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testConditionalLeftPresence = function() {
      	t.assertTrue(
          userInput.indexOf("gps.intersection === 'left'") !== -1,
          'Expect code to have an if statement with conditinal: if (gps.intersection === "left") {..',
          function(error) {
            setCase(4, error);
          }
      	);
      };

      this.testConditionalRightPresence = function() {
      	t.assertTrue(
          userInput.indexOf("gps.intersection === 'right'") !== -1,
          'Expect code to have an if statement with conditinal: (gps.intersection === "right") {..',
          function(error) {
            setCase(4, error);
          }
      	);
      };
	  });

    // == CONDITIONAL LEFT TESTS == //
	  runTestSuite(function GpsIntersectionLeftTest(t) {
	  	// == NEW GTA SANDBOX == //
      var context = new gtaSandbox().gpsLeft(userInput);

      var turn = context.testTurn.value;
      var calls = context.testTurn.calls;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Expected function turn() to be called in if statement, but got ' + calls + ' calls',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function(error) {
            setCase(4, error);
          }
        );
      };

      this.testTurnInputString = function() {
      	t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function(error) {
          	setCase(4, error);
          }
      	);
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right',
          'Expected function turn() argument to have value "left" or "right", but got value ' + turn,
          function(error) {
          	setCase(4, error);
          }
        );
      };

      this.testTurnInputValueLeft = function() {
        t.assertTrue(
          turn === 'left',
          'Expected function turn() argument to have value "left", but got value ' + turn,
          function(error) {
          	setCase(11, error);
          }
        );
      };
	  });

    // == CONDITIONAL RIGHT TESTS == //
	  runTestSuite(function GpsIntersectionRightTest(t) {
	  	// == NEW GTA SANDBOX == //
      var context = new gtaSandbox().gpsRight(userInput);

      var turn = context.testTurn.value;
      var calls = context.testTurn.calls;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Extected function turn() to be called in if statement, but got ' + calls + ' calls',
          function(error) {
          	setCase(5, error);
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function(error) {
          	setCase(5, error);
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function(error) {
            setCase(5, error);
          }
        );
      };

      this.testTurnInputString = function() {
      	t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function(error) {
          	setCase(5, error);
          }
      	);
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right',
          'Expected function turn() argument to have value "left" or "right", but got value ' + turn,
          function(error) {
          	setCase(5, error);
          }
        );
      };

      this.testTurnInputValueRight = function() {
        t.assertTrue(
          turn === 'right',
          'Expected function turn() argument to have value "right", but got value ' + turn,
          function(error) {
          	setCase(6, error);
          }
        );
      };
	  });

	});

  if (req.body.level === 9) {
    level9(req, res, next);
  } else {
		next();
  }

};

module.exports = level8;
