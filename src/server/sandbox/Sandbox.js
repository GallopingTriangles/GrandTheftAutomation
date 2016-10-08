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
    level: userLevel
  };

  // == BUGS ARRAY =======================================
  req.body.bugs = [];
	
  // == VIRTUAL MACHINE ==================================
	var script = new vm.Script(userInput);                  // compile user input
	var sandbox = {
    sensor: {
      front: false,
      left: false,
      right: false,
      all: false
    },
    enable: function(input) {

    },
  };                                       // create new sandbox and empty context
	var context = new vm.createContext(sandbox);
	script.runInContext(context);                           // run compiled code

	// == TESTING USER INPUT ===============================
	runTestSuite(function UserInputTest(t) {
    
    // ** ENGINE TESTS ** //
    // set engine on phaser object to context value if it exists
    context.engine ? req.body.phaser.engine = context.engine : req.body.phaser.engine = false;
    // start engine input test
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
    // set color on phaser object to context value if it exists
    context.color ? req.body.phaser.color = context.color : req.body.phaser.color = 'white';
    // start color input test
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
    // set speed on phaser object to context value if it exists
    context.speed ? req.body.phaser.speed = context.speed : req.body.phaser.speed = false;
    // start speed input test
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
    // set sensor on phaser object to context value if it exists
    context.sensor ? req.body.phaser.sensor = context.sensor : req.body.phaser.sensor = false;
    // start sensor input test
    runTestSuite(function SensorInputTest(t) {
      var sensor = context.sensor;

      // if a test fails, set the sensor value to a default value
      var setSensorDefault = function(errorMessage) {
        req.body.phaser.sensor = false;
        req.body.bugs.push(errorMessage);
      };

      // test if sensor is defined
      this.testSensorDefined = function() {
        t.assertDefined(sensor, 'sensor', setSensorDefault);
      };
      // test if sensor is of data type boolean
      this.testSensorBoolean = function() {
        t.assertBoolean(sensor, 'sensor', setSensorDefault);
	    };
      // test if sensor is equal to true
	    this.testSensorTrue = function() {
        t.assertTrue(sensor, 'Expected sensor to equal true, but got false', setSensorDefault);
	    };
    });

  next();
  
  });
  
};

module.exports = Sandbox;
