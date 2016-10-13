var vm = require('vm');

// next level
var level2 = require('./level2');

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
  // case 1: success right turn
  // case 2: fail, invalid speed or engine input
  // case 3: fail, car crashed straight
  // case 4: fail, crash left
  // case 5: fail, stall at intersection

	// == TESTING USER INPUT LEVEL 3 ========================
  runTestSuite(function UserInputTestLevel3(t) {
  	
  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + userInput;
    var script = new vm.Script(input);

    var setCaseCount = 1;
    var setCase = function(caseNo) {
    	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      setCaseCount++;
    	}
    };

  	// == MAP CONDITIONAL TEST == //
    req.body.bugs.push({name: 'MapConditionalFalseTest', tests: []});
    runTestSuite(function MapConditionalFalseTest(t) {
    	// sandbox for virtual machine
    	var sandbox = {
    		sensor: {
    	    front: false
    		},
    		map: {
    	    intersection: false
    		},
    		testEnable: [],
    		testTurn: {
    			value: undefined,
    			count: 0
    		}
    	};

    	var context = new vm.createContext(sandbox);
    	script.runInContext(context);

    	var turn = context.testTurn.value;
      var calls = context.testTurn.count;

    	this.testTurnNotCalled = function() {
        t.assertTrue(
          calls === 0,
          'Expected function turn() to be called inside if statement, but got called outside if statement',
          function() {
          	setCase(3); // car is turning before or after intersection
          }
        );
    	};

    });

    // == CONDITIONAL TESTS == //
    req.body.bugs.push({name: 'ConditionalTest', tests: []});
    runTestSuite(function ConditionalTest(t) {
      this.testConditionalPresence = function() {
        t.assertTrue(
          userInput.indexOf('if') !== -1,
          'Expected code to have an if statement, example: "if (map.intersection) { do something..."',
          function() {
            setCase(3);
          }
        );
      };

      this.testConditionalIntersectionPresence = function() {
        t.assertTrue(
          userInput.indexOf('map.intersection === true') !== -1,
          'Expected code to have an if statement with conditional: if (map.intersection === true) {...',
          function() {
            setCase(3);
          }
        );
      };
    });

    req.body.bugs.push({name: 'MapConditionalTrueTest', tests: []});
    runTestSuite(function MapConditionalTrueTest(t) {
      // sandbox for virtual machine
      var sandbox = {
      	sensor: {
          front: false
      	},
      	map: {
          intersection: true
      	},
      	testEnable: [],
      	testTurn: {
      		value: undefined,
      		count: 0
      	}
      };

      var context = new vm.createContext(sandbox);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls > 0,
          'Expected function turn() to be called, but got not called',
          function() {
          	setCase(3); // car is not turning at intersection
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once, but got called ' + calls,
          function() {
            if (turn === 'left') {
              setCase(4);
            } else {
            	setCase(3); // car is turning multiple times
            }
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got called with ' + turn,
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnInputString = function() {
        t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() to be called with input type of string, but got called with input of type ' + typeof turn,
          function() {
          	setCase(3); // car is not turning at intersection
          }
        );
      };

      this.testInputValueLeftOrRight = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right',
          'Expected function turn() to be called with argument "left" or "right", but got called with ' + turn,
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnInputValueRight = function() {
        t.assertTrue(
          turn === 'right',
          'Expected function turn() to be called with input value "right", but got input value ' + turn,
          function() {
            if (turn === 'left') {
              setCase(4);
            } else {
            	setCase(3); // car is not turning at intersetion
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