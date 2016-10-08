var util = require('util');
var vm = require('vm');

// == INDIVIDUAL LEVEL TESTS =============================
var tutorial = require('./levels/tutorial');
var level1 = require('./levels/level1');
var level2 = require('./levels/level2');
var level3 = require('./levels/level3');
var level4 = require('./levels/level4');

// == USE TESTING FRAMEWORK ==============================
var runTestSuite = require('./TestingFramework');

// == SANDBOX MIDDLEWARE =================================
var Sandbox = function(req, res, next) {
	var level = req.body.level;
	var userInput = req.body.log;

  // == PHASER OBJECT ====================================
  req.body.phaser = {
    level: level,
    test: 'dit is een test'
  };

  // == BUGS ARRAY =======================================
  req.body.bugs = [];

  // == LEVEL TEST ROUTES ================================
  if (level === 0) {
    tutorial(req, res, next);
  }
  if (level === 1) {
    level1(req, res, next);
  }
  if (level === 2) {
    level2(req, res, next);
  }
  if (level === 3) {
    level3(req, res, next);
  }
  if (level === 4) {
    level4(req, res, next);
  }
	
 //  // == VIRTUAL MACHINE ==================================
 //  var funcColor = 'var color = function(input) { testColor = input; };';
 //  var funcSpeed = 'var speed = function(input) { testSpeed = input; };';
 //  var funcEnable = 'var enable = function(input) { if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
 //  var funcTurn = 'var turn = function(input) { testTurn = input; };'
  
 //  var input = funcColor + funcSpeed + funcEnable + funcTurn + userInput;
	// var script = new vm.Script(input);

	// var sandbox = {
 //    testColor: undefined,
 //    testSpeed: undefined,
 //    testEngine: undefined,
 //    testSensor: undefined,
 //    testTurn: undefined,
 //    sensor: {
 //      front: 'on',
 //      left: undefined,
 //      right: 'off'
 //    }
 //  };                                       

	// var context = new vm.createContext(sandbox);
	// script.runInNewContext(context); 

 //  console.log(context);                       

	// // == TESTING USER INPUT ===============================
	// runTestSuite(function UserInputTest(t) {
    
 //    // ** ENGINE TESTS ** //
 //    // set engine on phaser object to context value if it exists
 //    context.testEngine ? req.body.phaser.engine = context.testEngine : req.body.phaser.engine = false;
 //    // start engine input test
 //    runTestSuite(function EngineInputTest(t) {
 //    	var engine = context.testEngine;

 //      // if a test fails, set the engine to a default value
 //      var setEngineDefault = function(errorMessage) {
 //        req.body.phaser.engine = false;
 //        req.body.bugs.push(errorMessage);
 //      };

 //      // test if engine is defined
	//     this.testEngineDefined = function() {
	//       t.assertDefined(engine, 'engine', setEngineDefault);
	//     };
 //      // test if engine is of data type boolean
	//     // this.testEngineBoolean = function() {
 //     //    t.assertString(engine, 'engine', setEngineDefault);
	//     // };
 //     //  // test if engine is equal to true
	//     // this.testEngineTrue = function() {
 //     //    //t.assertTrue(engine, 'Expected engine to equal true, but got false', setEngineDefault);
 //     //    t.assertEqual('on', engine);
	//     // };
 //    }); 

 //    // ** COLOR TESTS ** //
 //    // set color on phaser object to context value if it exists
 //    context.testColor ? req.body.phaser.color = context.testColor : req.body.phaser.color = 'white';
 //    // start color input test
 //    runTestSuite(function ColorInputTest(t) {
 //    	var color = context.testColor;

 //      // if a test fails, set the color to a default value
 //      var setColorDefault = function(errorMessage) {
 //        req.body.phaser.color = 'white';
 //        req.body.bugs.push(errorMessage);
 //      };

 //      // test if color is defined
	//     this.testColorDefined = function() {
	//       t.assertDefined(color, 'color', setColorDefault);
	//     };
 //      // test if color is of data type string
	//     this.testColorString = function() {
 //        t.assertString(color, 'color', setColorDefault);
	//     };
 //      // test if color is equal to white or red or blue or black
	//     this.testColorWhiteRedBlueBlack = function() {
 //        t.assertOptions(['white', 'black', 'red', 'blue'], color, setColorDefault);
	//     };
 //    });

 //    // ** SPEED TESTS ** //
 //    // set speed on phaser object to context value if it exists
 //    context.testSpeed ? req.body.phaser.speed = context.testSpeed : req.body.phaser.speed = false;
 //    // start speed input test
 //    runTestSuite(function SpeedInputTest(t) {
 //    	var speed = context.testSpeed;

 //      // if a test fails, set the speed to a default value
 //      var setSpeedDefault = function(errorMessage) {
 //        req.body.phaser.speed = false;
 //        req.body.bugs.push(errorMessage);
 //      };

 //      // test if speed is defined
 //      this.testSpeedDefined = function() {
 //        t.assertDefined(speed, 'speed', setSpeedDefault);
 //      };
 //      // test if speed is of data type number
 //      this.testSpeedNumber = function() {
 //        t.assertNumber(speed, 'speed', setSpeedDefault);
 //      };
 //      // test if speed is a positive number
 //      this.testSpeedPositive = function() {
 //        t.assertTrue(speed >= 0, 'Expected speed to be a positive number, but got a negative number', setSpeedDefault);
 //      };
 //    });

 //    // ** SENSOR TESTS ** //
 //    // set sensor on phaser object to context value if it exists
 //    context.testSensor ? req.body.phaser.sensor = context.testSensor : req.body.phaser.sensor = false;
 //    // start sensor input test
 //    runTestSuite(function SensorInputTest(t) {
 //      var sensor = context.testSensor;

 //      // if a test fails, set the sensor value to a default value
 //      var setSensorDefault = function(errorMessage) {
 //        req.body.phaser.sensor = false;
 //        req.body.bugs.push(errorMessage);
 //      };

 //      // test if sensor is defined
 //      this.testSensorDefined = function() {
 //        t.assertDefined(sensor, 'sensor', setSensorDefault);
 //      };
 //      // test if sensor is of data type boolean
 //      this.testSensorBoolean = function() {
 //        t.assertBoolean(sensor, 'sensor', setSensorDefault);
	//     };
 //      // test if sensor is equal to true
	//     this.testSensorTrue = function() {
 //        t.assertTrue(sensor, 'Expected sensor to equal true, but got false', setSensorDefault);
	//     };
 //    });

 //  });
  
  // next();

};

module.exports = Sandbox;
