var vm = require('vm');

// next level
var level10 = require('./level10');

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

    // == ENABLED TESTS == //
	  runTestSuite(function EnabledGpsInputTest(t) {
	  	// create new sandbox
	  	var sb = new Sandbox().sandbox;
	  	// create new virtual machine
	  	var context = new vm.createContext(sb);
		  script.runInContext(context);
      
      //console.log(context);

      var enabled = context.testEnabled.values;
      var calls = context.testEnabled.count;

      this.testEnabledCalledThreeTimes = function() {
        t.assertTrue(
          calls === 3,
          'Expected function enabled() to be called 3 times, but got called ' + calls + ' time(s)',
          function() {
          	setCase(4);
          }
        );
      };

      this.testEnabledCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected function enabled() to be called with an argument, but got ' + enabled[2],
          function() {
            setCase(4);
          }
        );
      };

      this.testEnabledInputTypeString = function() {
        t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected function enabled() to be called with an argument of type string, but got called with type ' + typeof enabled[2],
          function() {
          	setCase(4);
          } 
        );
      };

      this.testEnabledInputValueGps = function() {
        t.assertTrue(
          enabled[2] === 'gps',
          'Expected function enabled() to be called with argument "gps", but got called with ' + enabled[2],
          function() {
          	setCase(4);
          }
        );
      };


	  });

    // == CONDITIONAL LEFT TESTS == //
	  runTestSuite(function GpsIntersectionLeftTest(t) {
	  	var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'left';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      // console.log(context);    
	  });

    // == CONDITIONAL RIGHT TESTS == //
	  runTestSuite(function GpsIntersectionRightTest(t) {
	  	var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'right';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      // console.log(context);
	  });

	});

  if (req.body.level === 9) {

  } else if (req.body.level === 10) {
  	level10(req, res, next);
  } else {
		next();
  }

};

module.exports = level8;