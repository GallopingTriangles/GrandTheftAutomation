var vm = require('vm');

// next level
var level3 = require('./level3');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level2 = function(req, res, next) {
  
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
  // if (sensor.front === true) {
  //   setSpeed(0);
  // }
  //
	// ======================================================

	// == TESTING USER INPUT LEVEL 2 ========================
  runTestSuite(function UserInputTestLevel2(t) {
  	
  	// USER INPUT
  	var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed.value = input; testSpeed.count++ };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; };';
    // var funcTurn = 'var turn = function(input) { testTurn = input; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + userInput;
    var script = new vm.Script(input);

    var setCaseCount = 1;
    var setCase = function(caseNo) {
    	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      setCaseCount++;
    	}
    };

  	// == CONDITIONAL TESTS == //
  	runTestSuite(function SensorConditionalFalseTest(t) {
  		// sandbox for virtual machine
  		var sandbox = {
  			sensor: {
          front: false
  			},
        testEnable: [],
        testSpeed: {
        	value: 0,
        	count: 0
        }
  		};

  		var context = new vm.createContext(sandbox);
  		script.runInContext(context);

			var speed = context.testSpeed.value;
			var calls = context.testSpeed.count;

			this.testSetSpeedCalledOnce = function() {
	      t.assertTrue(
	        calls === 1,
	        'Expected function setSpeed() to be called once, but got called ' + calls + ' times'
	        // ADD FAIL CALLBACK
	      );
			};

  	});

		runTestSuite(function SensorConditionalTrueTest(t) {
			// sandbox for virtual machine
			var sandbox = {
				sensor: {
	        front: true
				},
	      testEnable: [],
	      testSpeed: {
	      	value: 0,
	      	count: 0
	      }
			};

			var context = new vm.createContext(sandbox);
			script.runInContext(context);

			var speed = context.testSpeed.value;
			var calls = context.testSpeed.count;

      // test is the setSpeed function is called twice, indicating the conditional
			this.testSetSpeedCalledTwice = function() {
        t.assertTrue(
          calls === 2,
          'Expected function setSpeed() to be called twice, but got called ' + calls + ' times'
          // ADD FAIL CALLBACK
        );
			};

      // test if the second call sets the speed to a number
			this.testSensorSetSpeedNumber = function() {
        t.assertTrue(
          calls === 2 && typeof speed === 'number',
          'Expected speed to be of data type number, but got set to ' + typeof speed,
          function() {
          	setCase(3); // syntax error, crash into object
          }
        );
			};

      // test if the second call sets the speed to a positive number
			this.testSensorSetSpeedPositive = function() {
        t.assertTrue(
          calls === 2 && speed >= 0,
          'Expected speed to be a positive number, but got a negative number',
          function() {
          	setCase(3); // syntax error, crash into object
          }
        );
			}

      // test if the sensor speed is set to 0 is the conditional is true
			this.testSensorSetSpeedValue = function() {
        t.assertTrue(
          calls === 2 && speed === 0,
          'Expected speed to be set to 0, but got ' + speed,
          function() {
          	setCase(3); // wrong input, crash into object
          }
        );
			};

		});

  });

  // if user level is greater than level 2, run tests of next level
  if (req.body.level > 2 && req.body.phaser.case === 1) {
  	level3(req, res, next);
  } else {
  // else return phaser object
  	next();
  }

};

module.exports = level2;