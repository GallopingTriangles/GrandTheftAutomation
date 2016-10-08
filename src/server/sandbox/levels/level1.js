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
	      );
	  	};

	  	// test the maximum allowed calls of the enable function
      this.testEnabledMaxCalls = function() {
      	var calls = context.testEnable.length;
        t.assertTrue(
        	calls <= 2,
          'Expected function enable() to be called twice, but got called ' + calls + ' times'
        );
      };

      // test if the input is of data type string
      this.testEnableInputType = function() {

      };

      // test if the input equals the expected input value
      this.testEnableInputValue = function() {

      };
    });

    // == ENGINE TESTS == //
    runTestSuite(function EngineInputTest(t) {

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