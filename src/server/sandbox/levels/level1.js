var vm = require('vm');

// next level
var level2 = require('./level2');
var level3 = require('./level3');
var level5 = require('./level5');
var level6 = require('./level6');
var level7 = require('./level7');
var level8 = require('./level8');
var level10 = require('./level10');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

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
    var funcColor = 'var setColor = function(input) { testColor.value = input; testColor.count++; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed.value = input; testSpeed.count++; };';
    var funcEnable = 'var enable = function(input) { testEnable.values.push(input); testEnable.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    var funcTurn = 'var turn = function(input) { testTurn = input; };';
    var funcRoute = 'var setRoute = function(input) { testRoute = input; };';
    var gps = 'var gps = { intersection: false };';
    var reroute = 'gps.reroute = function() {};';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + gps + reroute + userInput;
    var script = new vm.Script(input);

    // sandbox used in virtual machine
    var sandbox = {
    	sensor: {
    		front: false
    	},
    	map: {
        intersection: false
    	},
    	testEnable: {
    		values: [],
    		count: 0
    	},
    	testEngine: undefined,
    	testColor: {
        value: undefined,
        count: 0
    	},
    	testSpeed: {
        value: undefined,
        count: 0
    	},
    	testSensor: undefined,
    };

    var context = new vm.createContext(sandbox);
    script.runInContext(context);

    var setCaseCount = 1;
    var setCase = function(caseNo, errorMessage) {
    	if (setCaseCount === 1) {
    		req.body.phaser.case = caseNo;
        req.body.bugs.push(errorMessage);
    		setCaseCount++;
    	}
    };

    // == NEW GTA SANDBOX == //
    var newContext = new gtaSandbox().create(userInput);

    // == NEW ENABLED TESTS == //
    runTestSuite(function EnabledInputTest(t) {
      var enabled = newContext.testEnabled.values;
      var calls = newContext.testEnabled.calls;

      this.testEnabledCalled = function() {
        t.assertTrue(
          calls,
          'Expected function enable() to be called, but got ' + calls + ' calls',
          function(error) {
            setCase(2, error);
          }
        );
      };

      this.testEnabledCalledWithArgument = function() {
        t.assertTrue(
          enabled[0],
          'Expected function enable() to be called with an argument, but got called with ' + enabled[0],
          function(error) {
            setCase(2, error);
          }
        );
      };

      this.testEnabledArgumentString = function() {
        t.assertTrue(
          typeof enabled[0] === 'string',
          'Expected function enable() to be called with an argument of type string, but got called with argument of type ' + typeof enabled[0],
          function(error) {
            setCase(2, error);
          }
        );
      };

      this.testEnabledMaxCalls = function() {
        t.assertTrue(
          calls >= 2,
          'Expected function enable() to be called twice, but got called ' + calls + ' times',
          function(error) {
            setCase(2, error);
          }
        );
      };
    }); // END enable() tests

    // == NEW ENGINE TESTS == //
    // set engine on phaser object to context value
    req.body.phaser.engine = newContext.testEnabled.values[0];
    runTestSuite(function EngineInputTest(t) {

      var enabled = newContext.testEnabled.values;
      var calls = newContext.testEnabled.calls;

      this.testEngineEnabled = function() {
        t.assertTrue(
          enabled.indexOf('engine') !== -1,
          'Expected engine to be enabled with function enable(), but got not enabled',
          function(error) {
            setCase(2, error);
          }
        );
      };

      this.testEngineEnabledFirst = function() {
        t.assertTrue(
          enabled[0] === 'engine',
          'Expected engine to be enabled first, but got ' + enabled[0] + ' enabled first',
          function(error) {
            setCase(2, error);
          }
        );
      };
    }); // END enable('engine') tests

    // == NEW COLOR TESTS == //
    // set color on phaser object to new context value
    req.body.phaser.color = newContext.testSetcolor.value;
    runTestSuite(function ColorInputTest(t) {
      var color = newContext.testSetcolor.value;
      var calls = newContext.testSetcolor.calls;

      // if a test fails, set the color to a default value
      var setColorDefault = function(errorMessage) {
        req.body.phaser.color = 'white';
        req.body.bugs.push(errorMessage);
      };

      this.testColorCalled = function() {
        t.assertTrue(
          calls,
          'Expected function setColor() got be called, but got ' + calls + ' calls',
          setColorDefault
        );
      };

      this.testColorCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function setColor() to be called once, but got ' + calls + ' calls',
          setColorDefault
        );
      };

      this.testColorCalledWithArgument = function() {
        t.assertTrue(
          color,
          'Expected setColor() to be called with an argument, but got called with ' + color,
          setColorDefault
        );
      };

      // test if color is of data type string
      this.testColorString = function() {
        t.assertTrue(
          typeof color === 'string',
          'Expected setColor() to be called with an argument of type string, but got called with ' + typeof color,
          setColorDefault
        );
      };

      // test if color is equal to white, red, blue, or black
      this.testColorWhiteRedBlueBlack = function() {
        t.assertTrue(
          color === 'white' || color === 'black' || color === 'red' || color === 'blue' || color === 'panda',
          'Expected setColor() to be called with an argument of value white, black, red or blue, but got ' + color,
          setColorDefault
        );
      };
    }); // END setColor() tests

    // == NEW SPEED TESTS == //
    // set speed on phaser object to context
    req.body.phaser.speed = newContext.testSetspeed.value;
    runTestSuite(function SpeedInputTest(t) {
      
      var speed = newContext.testSetspeed.value;
      var calls = newContext.testSetspeed.calls;

      this.testSpeedCalled = function() {
        t.assertTrue(
          calls,
          'Expected setSpeed() to be called, but got ' + calls + ' calls',
          function(error) {
            setCase(2, error);
          }
        );
      };

      // test if the set speed function is called
      this.testSpeedCalledWithArgument = function() {
        t.assertTrue(
          speed,
          'Expected setSpeed() to be called with an argument, but got ' + speed,
          function(error) {
            setCase(2, error);
          }
        );
      };

      // test if speed if of data type number
      this.testSpeedNumber = function() {
        t.assertTrue(
          typeof speed === 'number',
          'Expected setSpeed() to be called with an argument of type number, but got called with argument of type ' + typeof speed,
          function(error) {
            setCase(2, error);
          } 
        );
      };

      // test if speed is a positive number
      this.testSpeedPositive = function() {
        t.assertTrue(
          speed >= 0, 
          'Expected speed to be a positive number, but got a negative number',
          function(error) {
            setCase(2, error);
          }
        );
      };
    }); // END setSpeed() tests

    // == NEW SENSOR TESTS == //
    // set sensor on phaser obj to context value
    req.body.phaser.sensor = newContext.testEnabled.values[1];
    runTestSuite(function SensorInputTest(t) {
      
      var sensor = newContext.testEnabled.values[1];

      // if a test fails, set the sensor value to a default value
      var setSensorDefault = function(errorMessage) {
        req.body.phaser.sensor = false;
        req.body.bugs.push(errorMessage);
        setCase(2);
      };

      // test if the sensor is enabled
      this.testSensorDefined = function() {
        t.assertTrue(
          sensor,
          'Expected sensor to be enabled with function enable(), but got undefined',
          setSensorDefault
        );
      };

      // test if the engine is enabled firstly
      this.testSensorEnabledSecond = function() {
        t.assertTrue(
          sensor === 'sensor',
          'Expected sensor to be enabled secondly, but got ' + sensor + ' enabled second',
          setSensorDefault
        );
      };
    }); // END enable('sensor') tests

  }); // END UserInputTestLevel1

  // if user level is greater than level 1, run tests of next level
  // and if case is success
  if (req.body.phaser.case === 1) {
    if (req.body.level === 2) {
    	level2(req, res, next);
    } else if (req.body.level === 3 || req.body.level === 4) {
    	level3(req, res, next);
    } else if (req.body.level === 5) {
    	level5(req, res, next);
    } else if (req.body.level === 6) {
    	level6(req, res, next);
    } else if (req.body.level === 7) {
      level7(req, res, next);
    } else if (req.body.level === 8 || req.body.level === 9) {
      level8(req, res, next);
    } else if (req.body.level === 10 || req.body.level === 11) {
      level10(req, res, next);
    } else {
    	next();
    }
  } else {
  	next();
  }
  
};

module.exports = level1;