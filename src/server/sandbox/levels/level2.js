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
    var funcSpeed = 'var setSpeed = function(input) { testSpeed.value = input; testSpeed.count++ };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    // var funcTurn = 'var turn = function(input) { testTurn = input; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + userInput;
    var script = new vm.Script(input);

  	// == CONDITIONAL TESTS == //
  	runTestSuite(function SensorConditionalFalseTest(t) {
  		// sandbox for virtual machine
  		var sandbox = {
  			sensor: {
          front: false
  			},
        testEnable: [],
        testSpeed: {
        	value: 0,
        	count: 0
        }
  		};

  		var context = new vm.createContext(sandbox);
  		script.runInContext(context);

  		console.log(context);

  		this.testSensorSetSpeed = function() {
        t.assertTrue(true);
  		};

  	});

		runTestSuite(function SensorConditionalTrueTest(t) {
			// sandbox for virtual machine
			var sandbox = {
				sensor: {
	        front: true
				},
	      testEnable: [],
	      testSpeed: {
	      	value: 0,
	      	count: 0
	      }
			};

			var context = new vm.createContext(sandbox);
			script.runInContext(context);

			console.log(context);

			this.testSensorSetSpeed = function() {
        t.assertTrue(true);
			};

		});

  });

  next();
  // if user level is greater than level 2, run tests of next level
  // if (req.body.level > 2) {
  // 	level3(req, res, next);
  // } else {
  // // else return phaser object
  // 	next();
  // }

};

module.exports = level2;