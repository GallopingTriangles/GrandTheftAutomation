var vm = require('vm');

// next level
var level4 = require('./level4');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

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

    var setCaseCount = 1;
    var setCase = function(caseNo, errorMessage) {
    	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
        req.body.bugs.push(errorMessage);
	      setCaseCount++;
    	}
    };

    // == NEW CONDITIONAL TESTS == //
    runTestSuite(function SensorConditionalFalseTest(t) {
      // == NEW GTA SANDBOX == //
      var context = new gtaSandbox().create(userInput);
      var calls = context.testSetspeed.calls;

      this.testSetSpeedCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function setSpeed() to be called once, but got called ' + calls + ' times',
          function(error) {
            setCase(3, error);
          }
        );
      };
    }); // END sensor.front === false

    // == CONDITIONAL TESTS == //
    runTestSuite(function ConditionalTest(t) {
      this.testConditionalPresence = function() {
        t.assertTrue(
          userInput.indexOf('if') !== -1,
          'Expected code to have an if statement, example: "if (sensor.front) { do something..."',
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);
            } else {
              setCase(3, error);
            }
          }
        );
      };

      this.testConditionalSensorPresence = function() {
        t.assertTrue(
          userInput.indexOf('sensor.front === true') !== -1,
          'Expected code to have an if statement with conditional: if (sensor.front === true) {...',
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);
            } else {
              setCase(3, error);
            }
          }
        );
      };
    }); // END if (sensor.front === true) {...

		runTestSuite(function SensorConditionalTrueTest(t) {
      // == NEW GTA SANDBOX == //
      var context = new gtaSandbox().sensorTrue(userInput);
			var speed = context.testSetspeed.value;
			var calls = context.testSetspeed.calls;

      // test is the setSpeed function is called twice, indicating the conditional
			this.testSetSpeedCalledTwice = function() {
        t.assertTrue(
          calls === 2,
          'Expected function setSpeed() to be called twice, but got called ' + calls + ' times',
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);
            } else {
            	setCase(3, error);
            }
          }
        );
			};

      this.testSetSpeedCalledWithArgument = function() {
        t.assertTrue(
          speed,
          'Expected setSpeed() to be called with an argument, but got ' + speed,
          function(error) {
            setCase(3, error);
          }
        );
      };

      // test if the second call sets the speed to a number
			this.testSensorSetSpeedNumber = function() {
        t.assertTrue(
          calls === 2 && typeof speed === 'number',
          'Expected speed to be of data type number, but got set to ' + typeof speed,
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);  
            } else {
            	setCase(3, error); // syntax error, crash into object
            }
          }
        );
			};

      // test if the second call sets the speed to a positive number
			this.testSensorSetSpeedPositive = function() {
        t.assertTrue(
          calls === 2 && speed >= 0,
          'Expected speed to be a positive number, but got a negative number',
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);
            } else {
            	setCase(3, error); // syntax error, crash into object
            }
          }
        );
			}

      // test if the sensor speed is set to 0 is the conditional is true
			this.testSensorSetSpeedValue = function() {
        t.assertTrue(
          calls === 2 && speed === 0,
          'Expected speed to be set to 0, but got ' + speed,
          function(error) {
            if (req.body.level === 4) {
              setCase(6, error);
            } else {
            	setCase(3, error); // wrong input, crash into object
            }
          }
        );
			};
		}); // END if (sensor.front === true) { setSpeed(0) }

  }); // END tests level 2

  // if user level is greater than level 2, run tests of next level
  if (req.body.level === 4 && req.body.phaser.case === 1) {
  	level4(req, res, next);
  } else {
  // else return phaser object
  	next();
  }

};

module.exports = level2;