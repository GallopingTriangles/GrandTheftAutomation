var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

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

  // == TESTING USER INPUT LEVEL 8 ========================
	runTestSuite(function UserInputTestLevel8(t) {
	  // USER INPUT
		var userInput = req.body.log;
	  // == VIRTUAL MACHINE =================================
	  var funcColor = 'var setColor = function(input) { testColor = input; };';
	  var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
	  var funcEnable = 'var enable = function(input) { testEnabled.values.push(input); testEnabled.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "gps") { testGps = true }; };';
	  var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
	  var funcRoute = 'var setRoute = function(input) { route.directions = input; route.count++ };';

	  // input for virtual machine
	  var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + userInput;
	  var script = new vm.Script(input);

	  var Sandbox = function() {
	    this.sandbox = {
		  	sensor: {
		  		front: false
		  	},
		  	map: {
		      intersection: false
		  	},
		  	gps: {
	        intersection: false
		  	},
		  	route: {
		  		directions: undefined,
		  		count: 0
		  	},
		  	testEnabled: {
	        values: [],
	        count: 0
		  	},
		  	testEngine: undefined,
		  	testColor: undefined,
		  	testSpeed: undefined,
		  	testSensor: undefined,
		  	testRoute: undefined,
		  	testRoute: undefined,
		  	testTurn: {
		  		value: undefined,
		  		count: 0
	      },
	      testGps: undefined
	    };
	   };

	  var setCaseCount = 1;
	  var setCase = function(caseNo) {
	  	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      setCaseCount++;
	  	}
	  };
    
    // == CONDITIONAL TESTS == //
    runTestSuite(function ConditionalTest(t) {
      var sb = new Sandbox().sandbox;
      var context = new vm.createContext(sb);
      script.runInContext(context);

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
          function() {
          	// ADD FAIL CALLBACK
          }
      	);
      };

      this.testConditionalSensorPresence = function() {
        t.assertTrue(
          userInput.indexOf('sensor.front === true') !== -1,
          'Expected code to have an if statement with conditional: (sensor.front === true) {...',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };
    });

    // == CONDITIONAL SENSOR TEST == //
    runTestSuite(function ConditionalSensorTest(t) {
    	var sb = new Sandbox().sandbox;
    	sb.sensor.front = true;
    	var context = new vm.createContext(sb);
    	script.runInContext(context);

    	var turn = context.testTurn.value;
    	var calls = context.testTurn.count;

    	this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Expected function turn() to be called in sensor.front if statement, but got ' + calls + ' calls',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
    	};

    	this.testTurnCalledWithArgument = function() {
    	  t.assertTrue(
    	    turn,
    	    'Expected function turn() to be called with an argument, but got ' + turn,
    	    function() {
    	      // ADD FAIL CALLBACK
    	    }
    	  );
    	};

    	this.testTurnInputString = function() {
    		t.assertTrue(
    	    typeof turn === 'string',
    	    'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
    	    function() {
    	    	// ADD FAIL CALLBACK
    	    }
    		);
    	};

    	this.testTurnInputValue = function() {
    	  t.assertTrue(
    	    turn === 'left' || turn === 'right' || turn === 'u-turn',
    	    'Expected function turn() argument to have value "left", "right" or "u-turn", but got value ' + turn,
    	    function() {
    	    	// ADD FAIL CALLBACK
    	    }
    	  );
    	};

    	this.testTurnInputValueLeft = function() {
    	  t.assertTrue(
    	    turn === 'u-turn',
    	    'Expected function turn() argument to have value "u-turn", but got value ' + turn,
    	    function() {
    	    	// ADD FAIL CALLBACK
    	    }
    	  );
    	};

    });

	});

  next();

};

module.exports = level9;