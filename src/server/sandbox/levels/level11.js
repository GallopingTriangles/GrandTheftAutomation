var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

var level11 = function(req, res, next) {

  runTestSuite(function UserInputTestLevel11(t) {
    // USER INPUT
    var userInput = req.body.log;
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnabled.values.push(input); testEnabled.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "gps") { testGps = true }; };';
    var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
    var funcRoute = 'var setRoute = function(input) { route.directions = input; route.count++ };';
    var reroute = 'gps.reroute = function() { testReroute++; };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + reroute + userInput;
    var script = new vm.Script(input);

    var Sandbox = function() {
      this.sandbox = {
        sensor: {
          front: false
        },
        map: {
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
        testGps: undefined,
        testReroute: 0,
        gps: {
          intersection: false
        }
      };
     };

     var setCaseCount = 1;
     var setCase = function(caseNo) {
       if (setCaseCount === 1) {
         req.body.phaser.case = caseNo;
         setCaseCount++;
       }
     };

     req.body.bugs.push({name: 'ConditionalTest', tests: []});
     runTestSuite(function ConditionalTest(t) {
       var sb = new Sandbox().sandbox;
       var context = new vm.createContext(sb);
       script.runInContext(context);

       var calls = context.testTurn.count;

       this.testTurnNotCalledOutsideConditional = function() {
         t.assertTrue(
           calls === 0,
           'Expected function turn() not to be called outside if statement, but got called ' + calls + ' time(s)',
           function() {
            setCase(4);
           }
         );
       };

       this.testConditionalPresence = function() {
         t.assertTrue(
           userInput.indexOf('if') !== -1,
           'Expected code to have an if statement, example: "if (sensor.front) { do something... }"',
           function() {
            setCase(5);
           }
         );
       };

       this.testFourConditionalsPresent = function() {
         var input = userInput;
         var count = 0;
         var pos = input.indexOf('if');
         while (pos !== -1) {
          count++;
          pos = input.indexOf('if', pos + 1);
         }
         t.assertTrue(
           count >= 4,
           'Expected code to have three if statements, but got ' + count + ' if statement(s)',
           function() {
             setCase(8);
           }
         );
       };

       this.testConditionalSensorPresence = function() {
        t.assertTrue(
           userInput.indexOf("sensor.front === true") !== -1,
           'Expect code to have an if statement with conditinal: (sensor.front === true) {..',
           function() {
             setCase(8);
           }
        );
       };

       // == CONDITIONAL SENSOR TESTS == //
       req.body.bugs.push({name: 'SensorFrontCollisionDetection', tests: []});
       runTestSuite(function SensorFrontCollisionDetection(t) {
         var sb = new Sandbox().sandbox;
         sb.sensor.front = true;

         var context = new vm.createContext(sb);
         script.runInContext(context);

         var calls = context.testReroute;

         this.testGpsRerouteCalled = function() {
           t.assertTrue(
             calls,
             'Extected function gps.reroute() to be called in if statement, but got ' + calls + ' calls',
             function() {
               setCase(8);
             }
           );
         };

         this.testGpsRerouteCalledOnce = function() {
           t.assertTrue(
             calls === 1,
             'Expected function gps.reroute() to be called once in if statement, but got ' + calls + ' calls',
             function() {
               setCase(8);
             }
           );
         };
         
       });

    });



  });

  next();

};

module.exports = level11;