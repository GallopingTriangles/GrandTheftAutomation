var util = require('util');
var vm = require('vm');

// == USE TESTING FRAMEWORK ==============================
var runTestSuite = require('./TestingFramework');

// == SANDBOX MIDDLEWARE =================================
var Sandbox = function(req, res, next) {
	var userLevel = req.body.level;
	var userInput = req.body.log;
	
	// compile user input
	var script = new vm.Script(userInput);
	// create new sandbox and empty context
	var sandbox = {};
	var context = new vm.createContext(sandbox);
	// run compiled code
	script.runInContext(context);

	// == TESTING USER INPUT ===============================
	runTestSuite(function UserInputTest(t) {
    
    // ** ENGINE TESTS ** //
    runTestSuite(function EngineInputTest(t) {
    	var engine = context.engine;
	    this.testEngineDefined = function() {
	      t.assertDefined(engine, 'engine');
	    };
	    this.testEngineBoolean = function() {
        t.assertBoolean(engine, 'engine');
	    };
	    this.testEngineTrue = function() {
        t.assertTrue(engine, 'Expected engine to equal true, but got false');
	    };
    }); 

    // ** COLOR TESTS ** //
    runTestSuite(function ColorInputTest(t) {
    	var color = context.color;
	    this.testColorDefined = function() {
	      t.assertDefined(color, 'color');
	    };
	    this.testColorString = function() {
        t.assertString(color, 'color');
	    };
	    this.testColorWhiteRedBlueBlack = function() {
        // TODO
	    };
    });

    // ** SPEED TESTS ** //
    runTestSuite(function SpeedInputTest(t) {
    	var speed = context.speed;
      this.testSpeedDefined = function() {
        t.assertDefined(speed, 'speed');
      };
      this.testSpeedNumber = function() {
        t.assertNumber(speed, 'speed');
      };
      this.testSpeedPositive = function() {
        t.assertTrue(speed >= 0, 'Expected speed to be a positive number, but got a negative number');
      };
    });

    // ** SENSOR TESTS ** //
    runTestSuite(function SensorInputTest(t) {
      var sensor = context.sensor;
      this.testSensorDefined = function() {
        t.assertDefined(sensor, 'sensor');
      };
      this.testSensorBoolean = function() {
        t.assertBoolean(sensor, 'sensor');
	    };
	    this.testSensorTrue = function() {
        t.assertTrue(sensor, 'Expected sensor to equal true, but got false');
	    };
    });

	});
  
  next();
};

module.exports = Sandbox;
