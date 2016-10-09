var vm = require('vm');

// next level
var level2 = require('./level2');
var level3 = require('./level3');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level1 = function(req, res, next) {

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
	// ======================================================
  
  // == TESTING USER INPUT ================================
  runTestSuite(function UserInputTestLevel1(t) {
    // ASSUME A SUCCESSFUL TEST
    req.body.phaser.case = 1;

  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    // var funcTurn = 'var turn = function(input) { testTurn = input; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + userInput;
    var script = new vm.Script(input);

    // sandbox used in virtual machine
    var sandbox = {
    	sensor: {
    		front: false
    	},
    	testEnable: [],
    	testEngine: undefined,
    	testColor: undefined,
    	testSpeed: undefined,
    	testSensor: undefined,
    };

    var context = new vm.createContext(sandbox);
    script.runInContext(context);

    // console.log(context);

    // == ENABLED TESTS == //
    runTestSuite(function EnabledInputTest(t) {
    	// grab enabled array from sandbox context
    	var enabled = context.testEnable;
	  	// test if the enable function is called
	  	this.testEnabledCalled = function() {
	      t.assertTrue(
	      	enabled.length > 0, 
	      	'Expected function enable() to be called, but got not called'
	      	// ADD FAIL CALLBACK
	      );
	  	};

	  	// test the maximum allowed calls of the enable function
      this.testEnabledMaxCalls = function() {
      	var calls = enabled.length;
        t.assertTrue(
        	calls <= 2,
          'Expected function enable() to be called twice, but got called ' + calls + ' times'
          // ADD FAIL CALLBACK
        );
      };

      // test if the input is of data type string
      this.testEnableInputType = function() {
        t.assertOptionsOfTypeString(
          enabled
          // ADD FAIL CALLBACK
        );
      };
    });

    // == ENGINE TESTS == //
    // set engine on phase object to context value
    req.body.phaser.engine = context.testEngine;
    runTestSuite(function EngineInputTest(t) {
      
      var setEngineDefault = function(errorMessage) {
        req.body.phaser.engine = false;
        req.body.phaser.case = 2;
      };

      // test if the engine is enabled
      this.testEngineDefined = function() {
        t.assertTrue(
        	context.testEngine,
          'Expected engine to be enabled, but got undefined',
          setEngineDefault
        );
      };

      // test if the engine is enabled firstly
      this.testEngineEnabledFirst = function() {
      	var enabledFirst = '';
        context.testEnable[0] ? enabledFirst = context.testEnable[0] : enabledFirst = '';
        t.assertTrue(
          context.testEnable[0] === 'engine',
          'Expected engine to be enabled first, but got ' + enabledFirst + ' enabled first',
          setEngineDefault
        );
      };
    });

    // == COLOR TESTS == //
    // set color on phaser object to context value
    req.body.phaser.color = context.testColor;
    runTestSuite(function ColorInputTest(t) {
    	// grab color from sanbox context
    	var color = context.testColor;

      // if a test fails, set the color to a default value
      var setColorDefault = function(errorMessage) {
        req.body.phaser.color = 'white';
      };

      // test if the set color function is called
      this.testColorDefined = function() {
        t.assertTrue(
          color,
          'Expected color to be set, but got undefined',
          setColorDefault
        );
      };

      // test if color is of data type string
      this.testColorString = function() {
        t.assertString(
          color,
          'color',
          setColorDefault
        );
      };

      // test if color is equal to white, red, blue, or black
      this.testColorWhiteRedBlueBlack = function() {
        t.assertOptions(
          ['white', 'black', 'red', 'blue'],
          color,
          setColorDefault
        );
      };
    });

    // == SPEED TESTS == //
    // set speed on phaser object to context
    req.body.phaser.speed = context.testSpeed;
    runTestSuite(function SpeedInputTest(t) {
    	// grab speed from sandbox context
    	var speed = context.testSpeed;

      // if a test fails, set the speed to a default value
      var setSpeedDefault = function(errorMessage) {
        req.body.phaser.speed = false;
        req.body.phaser.case = 2;
      };

    	// test if the set speed function is called
    	this.testSpeedDefined = function() {
        t.assertTrue(
          speed,
          'Expected speed to be set, but got undefined',
          setSpeedDefault
        );
    	};

    	// test if speed if of data type number
    	this.testSpeedNumber = function() {
        t.assertNumber(
        	speed,
        	'speed',
        	setSpeedDefault
        );
    	};

    	// test if speed is a positive number
    	this.testSpeedPositive = function() {
        t.assertTrue(
        	speed >= 0, 
        	'Expected speed to be a positive number, but got a negative number',
        	setSpeedDefault
        );
    	};
    });

    // == SENSOR TESTS == //
    // set sensor on phaser object to context value
    req.body.phaser.sensor = context.testSensor;
    runTestSuite(function SensorInputTest(t) {
    	// grab sensor value from context
    	var sensor = context.testSensor;

      // if a test fails, set the sensor value to a default value
      var setSensorDefault = function(errorMessage) {
        req.body.phaser.sensor = false;
      };

      // test if the sensor is enabled
      this.testSensorDefined = function() {
        t.assertTrue(
        	sensor,
          'Expected sensor to be enabled, but got undefined',
          setSensorDefault
        );
      };

      // test if the engine is enabled firstly
      this.testSensorEnabledSecond = function() {
      	var enabledSecond = '';
        context.testEnable[1] ? enabledSecond = context.testEnable[1] : enabledSecond = '';
        t.assertTrue(
          context.testEnable[1] === 'sensor',
          'Expected sensor to be enabled secondly, but got ' + enabledSecond + ' enabled second',
          setSensorDefault
        );
      };
    });

  });

  // if user level is greater than level 1, run tests of next level
  // and if case is success
  if (req.body.level === 2 && req.body.phaser.case === 1) {
    level2(req, res, next);
  } else if (req.body.level === 3 && req.body.phaser.case === 1) {
    level3(req, res, next);
  } else {
  // else return phaser object
	  next();
  }
  
};

module.exports = level1;