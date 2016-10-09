var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level5 = function(req, res, next) {

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
  // enable('route');
  // 
  // route(['left']) |or| route(['right'])
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn
	// case 2: fail, engine not on or speed 0
	// case 3: success, right turn
	// case 4: fail, crashed going straight

	// == TESTING USER INPUT LEVEL 5 ========================
	runTestSuite(function UserInputTestLevel5(t) {
  
  // USER INPUT
	var userInput = req.body.log;
  // == VIRTUAL MACHINE =================================
  var funcColor = 'var setColor = function(input) { testColor = input; };';
  var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
  var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "route") { testRoute = true }; };';
  var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
  var funcRoute = 'var route = function(input) { directions = input; };';

  // input for virtual machine
  var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + userInput;
  var script = new vm.Script(input);

  var sandbox = {
  	sensor: {
  		front: false
  	},
  	map: {
      intersection: false
  	},
  	directions: undefined,
  	testEnable: [],
  	testEngine: undefined,
  	testColor: undefined,
  	testSpeed: undefined,
  	testSensor: undefined,
  	testRoute: undefined,
  	testRoute: undefined
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

  console.log('CONTEXT', context);

  // == ENABLED TESTS == //
  runTestSuite(function EnabledInputTest(t) {
  	// enabled array in sandbox context
  	var enabled = context.testEnable;
  	// test if enabled function has expected behaviour
    this.testEnabledCalledThreeTimes = function() {
      t.assertTrue(
        enabled.length === 3,
        'Expect enable() to be called three times, but got called ' + enabled.length + ' times',
        function() {
        	setCase(2); // error, don't let car move
        }
      );
    };

    // test if all the input is of data type string
    this.testEnableInputType = function() {
    	t.assertOptionsOfTypeString(
        enabled,
        function() {
        	setCase(4); // input error of lastly added item, car crashes
        }
    	);
    };

    // test if route is enabled thirdly
    this.testRouteEnabledThirdly = function() {
      var enabledThird = '';
      context.testEnable[2] ? enabledThird = context.testEnable[2] : enabledThird = '';
      t.assertTrue(
        enabledThird === 'route',
        'Expected route to be enabled thirdly, but got ' + enabledThird + ' enabled thirdly',
        function() {
          setCase(4); // syntax error, route not enabled. car crashes
        }
      );
    }
  });

  // == ROUTE TESTS == //
  runTestSuite(function RouteInputTest(t) {
    
  });

	});

	next();

};

module.exports = level5;
