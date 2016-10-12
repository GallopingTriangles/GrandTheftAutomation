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
    var setCase = function(caseNo) {
    	if (setCaseCount === 1) {
    		req.body.phaser.case = caseNo;
    		setCaseCount++;
    	}
    };

    // == ENABLED TESTS == //
    runTestSuite(function EnabledInputTest(t) {
    	// grab enabled array from sandbox context
    	var enabled = context.testEnable.values;
    	var calls = context.testEnable.count;
	  	// test if the enable function is called
	  	this.testEnabledCalled = function() {
	      t.assertTrue(
	      	calls, 
	      	'Expected function enable() to be called, but got not called',
	      	function() {
	      		setCase(2);
	      	}
	      );
	  	};

	  	this.testEnabledCalledWithArgument = function() {
        t.assertTrue(
          enabled[0],
          'Expected function enable() to be called with an argument, but got called with ' + enabled[0],
          function() {
          	setCase(2);
          }
        );
	  	};

	  	this.testEnabledArgumentString = function() {
        t.assertTrue(
          typeof enabled[0] === 'string',
          'Expected function enable() to be called with an argument of type string, but got called with argument of type ' + typeof enabled[0],
          function() {
          	setCase(2);
          }
        );
	  	};

	  	// test the maximum allowed calls of the enable function
	  	if (req.body.level === 1) {
        this.testEnabledMaxCalls = function() {
        	var calls = enabled.length;
          t.assertTrue(
          	calls <= 2,
            'Expected function enable() to be called twice, but got called ' + calls + ' times',
            function() {
            	// ADD FAIL CALLBACK
            }
          );
        };
	  	}

      // test if the input is of data type string
      // this.testEnableInputType = function() {
      //   t.assertOptionsOfTypeString(
      //     enabled,
      //     function() {
      //     	setCase(2);
      //     }
      //   );
      // };
    });

    // == ENGINE TESTS == //
    // set engine on phase object to context value
    req.body.phaser.engine = context.testEngine;
    runTestSuite(function EngineInputTest(t) {

    	var enabled = context.testEnable.values;
    	var calls = context.testEnable.count;
      
      var setEngineDefault = function(errorMessage) {
        req.body.phaser.engine = false;
        req.body.phaser.case = 2;
      };

      // test if the engine is enabled
      this.testEngineDefined = function() {
        t.assertTrue(
        	context.testEngine,
          'Expected engine to be enabled with function enable(), but got undefined',
          function() {
          	setCase(2);
          }
        );
      };

      // test if the engine is enabled firstly
      this.testEngineEnabledFirst = function() {
        t.assertTrue(
          enabled[0] === 'engine',
          'Expected engine to be enabled first, but got ' + enabled[0] + ' enabled first',
          function() {
          	setCase(2);
          }
        );
      };
    });

    // == COLOR TESTS == //
    // set color on phaser object to context value
    req.body.phaser.color = context.testColor.value;
    runTestSuite(function ColorInputTest(t) {
    	// grab color from sanbox context
    	var color = context.testColor.value;
    	var calls = context.testColor.count;

      // if a test fails, set the color to a default value
      var setColorDefault = function(errorMessage) {
        req.body.phaser.color = 'white';
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

      // test if the set color function is called
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
    });

    // == SPEED TESTS == //
    // set speed on phaser object to context
    req.body.phaser.speed = context.testSpeed.value;
    runTestSuite(function SpeedInputTest(t) {
    	// grab speed from sandbox context
    	var speed = context.testSpeed.value;
    	var calls = context.testSpeed.count;

      // if a test fails, set the speed to a default value
      var setSpeedDefault = function(errorMessage) {
        req.body.phaser.speed = false;
        req.body.phaser.case = 2;
      };

      this.testSpeedCalled = function() {
      	t.assertTrue(
          calls,
          'Expected setSpeed() to be called, but got ' + calls + ' calls',
          function() {
          	setCase(2);
          }
      	);
      };

    	// test if the set speed function is called
    	this.testSpeedCalledWithArgument = function() {
        t.assertTrue(
          speed,
          'Expected setSpeed() to be called with an argument, but got ' + speed,
          function() {
          	setCase(2);
          }
        );
    	};

    	// test if speed if of data type number
    	this.testSpeedNumber = function() {
        t.assertTrue(
          typeof speed === 'number',
          'Expected setSpeed() to be called with an argument of type number, but got called with argument of type ' + typeof speed,
          function() {
          	setCase(2);
          } 
        );
    	};

    	// test if speed is a positive number
    	this.testSpeedPositive = function() {
        t.assertTrue(
        	speed >= 0, 
        	'Expected speed to be a positive number, but got a negative number',
        	function() {
        		setCase(2);
        	}
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
      	var enabledSecond = '';
        context.testEnable.values[1] ? enabledSecond = context.testEnable.values[1] : enabledSecond = '';
        t.assertTrue(
          context.testEnable.values[1] === 'sensor',
          'Expected sensor to be enabled secondly, but got ' + enabledSecond + ' enabled second',
          setSensorDefault
        );
      };
    });

  });

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