var vm = require('vm');

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
  runTestSuite(function UserInputTest(t) {
  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + userInput;
    var script = new vm.Script(input);

    // sandbox used in virtual machine
    var sandbox = {
    	testEnable: [],
    	testEngine: undefined,
    	testColor: undefined,
    	testSpeed: undefined,
    	testSensor: undefined,
    };

    var context = new vm.createContext(sandbox);
    script.runInContext(context);

    console.log(context);

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
    runTestSuite(function EngineInputTest(t) {
      // test if the engine is enabled
      this.testEngineDefined = function() {
        t.assertTrue(
        	context.testEngine,
          'Expected engine to be enabled, but got undefined'
          // ADD FAIL CALLBACK
        );
      };

      // test if the engine is enabled firstly
      this.testEngineEnabledFirst = function() {
      	var enabledFirst = '';
        context.testEnable[0] ? enabledFirst = context.testEnable[0] : enabledFirst = '';
        t.assertTrue(
          context.testEnable[0] === 'engine',
          'Expected engine to be enabled first, but got ' + enabledFirst + ' enabled first'
          // ADD FAIL CALLBACK
        );
      };
    });

    // == COLOR TESTS == //
    runTestSuite(function ColorInputTest(t) {
    	// grab color from sanbox context
    	var color = context.testColor;
      // test if the set color function is called
      this.testColorDefined = function() {
        t.assertTrue(
          color,
          'Expected color to be set, but got undefined'
          // ADD FAIL CALLBACK
        );
      };

      // test if color is of data type string
      this.testColorString = function() {
        t.assertString(
          color,
          'color'
          // ADD FAIL CALLBACK
        );
      };

      // test if color is equal to white, red, blue, or black
      this.testColorWhiteRedBlueBlack = function() {
        t.assertOptions(
          ['white', 'black', 'red', 'blue'],
          color
          // ADD FAIL CALLBACK
        );
      };
    });

    // == SPEED TESTS == //
    runTestSuite(function SpeedInputTest(t) {
    	// grab speed from sandbox context
    	var speed = context.testSpeed;
    	// test if the set speed function is called
    	this.testSpeedDefined = function() {
        t.assertTrue(
          speed,
          'Expected speed to be set, but got undefined'
          // ADD FAIL CALLBACK
        );
    	};

    	// test if speed if of data type number
    	this.testSpeedNumber = function() {
        t.assertNumber(
        	speed,
        	'speed'
        	// ADD FAIL CALLBACK
        );
    	};

    	// test if speed is a positive number
    	this.testSpeedPositive = function() {
        t.assertTrue(
        	speed >= 0, 
        	'Expected speed to be a positive number, but got a negative number'
        	// ADD FAIL CALLBACK
        );
    	};
    });

    // == SENSOR TESTS == //
    runTestSuite(function SensorInputTest(t) {
    	// grab sensor value from context
    	var sensor = context.testSensor;
      // test if the sensor is enabled
      this.testSensorDefined = function() {
        t.assertTrue(
        	sensor,
          'Expected sensor to be enabled, but got undefined'
          // ADD FAIL CALLBACK
        );
      };

      // test if the engine is enabled firstly
      this.testSensorEnabledSecond = function() {
      	var enabledSecond = '';
        context.testEnable[1] ? enabledSecond = context.testEnable[1] : enabledSecond = '';
        t.assertTrue(
          context.testEnable[1] === 'sensor',
          'Expected sensor to be enabled secondly, but got ' + enabledSecond + ' enabled second'
          // ADD FAIL CALLBACK
        );
      };
    });

  });

  next();
};

module.exports = level1;