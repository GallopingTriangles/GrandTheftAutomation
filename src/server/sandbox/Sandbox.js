var util = require('util');
var vm = require('vm');

// == USE TESTING FRAMEWORK ==============================
var runTestSuite = require('./TestingFramework');

// == SANDBOX MIDDLEWARE =================================
var Sandbox = function(req, res, next) {
	var userLevel = req.body.level;
	var userInput = req.body.log;

  // == PHASER OBJECT ====================================
  req.body.phaser = {                                     // default phaser object
    //engine: true,
    sensor: true,
    level: userLevel
  };

  // == BUGS ARRAY =======================================
  req.body.bugs = [];
	
  // == VIRTUAL MACHINE ==================================
	var script = new vm.Script(userInput);                  // compile user input
	var sandbox = {};                                       // create new sandbox and empty context
	var context = new vm.createContext(sandbox);
	script.runInContext(context);                           // run compiled code

	// == TESTING USER INPUT ===============================
	runTestSuite(function UserInputTest(t) {
    
    // ** ENGINE TESTS ** //
    context.engine ? req.body.phaser.engine = context.engine : req.body.phaser.engine = false;
    runTestSuite(function EngineInputTest(t) {
    	var engine = context.engine;

      // if a test fails, set the engine to a default value
      var setEngineDefault = function(errorMessage) {
        req.body.phaser.engine = false;
        req.body.bugs.push(errorMessage);
      };

      // test if engine is defined
	    this.testEngineDefined = function() {
	      t.assertDefined(engine, 'engine', setEngineDefault);
	    };
      // test if engine is of data type boolean
	    this.testEngineBoolean = function() {
        t.assertBoolean(engine, 'engine', setEngineDefault);
	    };
      // test if engine is equal to true
	    this.testEngineTrue = function() {
        t.assertTrue(engine, 'Expected engine to equal true, but got false', setEngineDefault);
	    };
    }); 

    // ** COLOR TESTS ** //
    context.color ? req.body.phaser.color = context.color : req.body.phaser.color = 'white';
    runTestSuite(function ColorInputTest(t) {
    	var color = context.color;

      // if a test fails, set the color to a default value
      var setColorDefault = function(errorMessage) {
        req.body.phaser.color = 'white';
        req.body.bugs.push(errorMessage);
      };

      // test if color is defined
	    this.testColorDefined = function() {
	      t.assertDefined(color, 'color', setColorDefault);
	    };
      // test if color is of data type string
	    this.testColorString = function() {
        t.assertString(color, 'color', setColorDefault);
	    };
      // test if color is equal to white or red or blue or black
	    this.testColorWhiteRedBlueBlack = function() {
        t.assertOptions(['white', 'black', 'red', 'blue'], color, setColorDefault);
	    };
    });

    // ** SPEED TESTS ** //
    context.speed ? req.body.phaser.speed = context.speed : req.body.phaser.speed = false;
    runTestSuite(function SpeedInputTest(t) {
    	var speed = context.speed;

      // if a test fails, set the speed to a default value
      var setSpeedDefault = function(errorMessage) {
        req.body.phaser.speed = false;
        req.body.bugs.push(errorMessage);
      };

      // test if speed is defined
      this.testSpeedDefined = function() {
        t.assertDefined(speed, 'speed', setSpeedDefault);
      };
      // test if speed is of data type number
      this.testSpeedNumber = function() {
        t.assertNumber(speed, 'speed', setSpeedDefault);
      };
      // test if speed is a positive number
      this.testSpeedPositive = function() {
        t.assertTrue(speed >= 0, 'Expected speed to be a positive number, but got a negative number', setSpeedDefault);
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

  next();
  });
  
};

module.exports = Sandbox;
