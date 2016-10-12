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
  // WRITE MORE STUFF HERE
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success,
	// case 2: fail, invalid engine or speed

console.log('ARE WE HERE?')
var level10 = function(req, res, next) {

  runTestSuite(function UserInputTestLevel10(t) {
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
  })

  next();

};

module.exports = level10;
