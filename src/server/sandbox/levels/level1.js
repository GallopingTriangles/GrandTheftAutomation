var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level1 = function(req, res, next) {
  
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
	  	// test if the enable function is called
	  	this.testEnabledCalled = function() {
	      t.assertTrue(
	      	context.testEnable.length > 0, 
	      	'Expected function enable() to be called, but got not called'
	      	// ADD FAIL CALLBACK
	      );
	  	};

	  	// test the maximum allowed calls of the enable function
      this.testEnabledMaxCalls = function() {
      	var calls = context.testEnable.length;
        t.assertTrue(
        	calls <= 2,
          'Expected function enable() to be called twice, but got called ' + calls + ' times'
          // ADD FAIL CALLBACK
        );
      };

      // test if the input is of data type string
      this.testEnableInputType = function() {
        t.assertOptionsOfTypeString(
          context.testEnable
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
        );
      };
    });

    // == COLOR TESTS == //
    runTestSuite(function ColorInputTest(t) {

    });

    // == SPEED TESTS == //
    runTestSuite(function SpeedInputTest(t) {

    });

    // == SENSOR TESTS == //
    runTestSuite(function SensorInputTest(t) {

    });
  });

  next();
};

module.exports = level1;