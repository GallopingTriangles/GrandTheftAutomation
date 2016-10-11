var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level9 = function(req, res, next) {

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
  // enable('gps');
  // 
  // if (gps.intersection === 'left') {
  //   turn('left');
  // }
  //
  // if (gps.intersection === 'right') {
  //   turn('right');
  // }
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success
	// case 2:

  // == TESTING USER INPUT LEVEL 8 ========================
	runTestSuite(function UserInputTestLevel8(t) {
	  // USER INPUT
		var userInput = req.body.log;
	  // == VIRTUAL MACHINE =================================
	  var funcColor = 'var setColor = function(input) { testColor = input; };';
	  var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
	  var funcEnable = 'var enable = function(input) { testEnabled.values.push(input); testEnabled.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "gps") { testGps = true }; };';
	  var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
	  var funcRoute = 'var setRoute = function(input) { route.directions = input; route.count++ };';

	  // input for virtual machine
	  var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + userInput;
	  var script = new vm.Script(input);

	  var Sandbox = function() {
	    this.sandbox = {
		  	sensor: {
		  		front: false
		  	},
		  	map: {
		      intersection: false
		  	},
		  	gps: {
	        intersection: false
		  	},
		  	route: {
		  		directions: undefined,
		  		count: 0
		  	},
		  	testEnabled: {
	        values: [],
	        count: 0
		  	},
		  	testEngine: undefined,
		  	testColor: undefined,
		  	testSpeed: undefined,
		  	testSensor: undefined,
		  	testRoute: undefined,
		  	testRoute: undefined,
		  	testTurn: {
		  		value: undefined,
		  		count: 0
	      },
	      testGps: undefined
	    };
	   };

	  var setCaseCount = 1;
	  var setCase = function(caseNo) {
	  	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      setCaseCount++;
	  	}
	  };
    
    // == CONDITIONAL TESTS == //
    runTestSuite(function ConditionalTest(t) {
      var sb = new Sandbox().sandbox;
      var context = new vm.createContext(sb);
      script.runInContext(context);

      this.testThreeConditionalsPresent = function() {
      	var input = userInput;
      	var count = 0;
      	var pos = input.indexOf('if');
      	while (pos !== -1) {
      		count++;
      		pos = input.indexOf('if', pos + 1);
      	}
      };

      this.testConditionalSensorPresence = function() {
        
      };
    });

    // == CONDITIONAL SENSOR TEST == //
    runTestSuite(function ConditionalSensorTest(t) {
    	var sb = new Sandbox().sandbox;
    	sb.sensor.front = true;
    	var context = new vm.createContext(sb);
    	script.runInContext(context);

    });

	});

  next();

};

module.exports = level9;