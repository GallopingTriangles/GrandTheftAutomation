var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

var level11 = function(req, res, next) {

  runTestSuite(function UserInputTestLevel11(t) {
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

     runTestSuite(function ConditionalTest(t) {
       // == NEW GTA SANDBOX == //
       var context = new gtaSandbox().create(userInput);

       var calls = context.testTurn.calls;

       this.testTurnNotCalledOutsideConditional = function() {
         t.assertTrue(
           calls === 0,
           'Expected function turn() not to be called outside if statement, but got called ' + calls + ' time(s)',
           function(error) {
            setCase(4, error);
           }
         );
       };

       this.testConditionalPresence = function() {
         t.assertTrue(
           userInput.indexOf('if') !== -1,
           'Expected code to have an if statement, example: "if (sensor.front) { do something... }"',
           function(error) {
            setCase(5, error);
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
           function(error) {
             setCase(8, error);
           }
         );
       };

       this.testConditionalSensorPresence = function() {
        t.assertTrue(
           userInput.indexOf("sensor.front === true") !== -1,
           'Expect code to have an if statement with conditinal: (sensor.front === true) {..',
           function(error) {
             setCase(8, error);
           }
        );
       };

       // == CONDITIONAL SENSOR TESTS == //
       runTestSuite(function SensorFrontCollisionDetection(t) {
         // == NEW GTA SANDBOX == //
         var context = new gtaSandbox().sensorTrue(userInput);

         var calls = context.testReroute.calls;

         this.testGpsRerouteCalled = function() {
           t.assertTrue(
             calls,
             'Extected function gps.reroute() to be called in if statement, but got ' + calls + ' calls',
             function(error) {
               setCase(8, error);
             }
           );
         };

         this.testGpsRerouteCalledOnce = function() {
           t.assertTrue(
             calls === 1,
             'Expected function gps.reroute() to be called once in if statement, but got ' + calls + ' calls',
             function(error) {
               setCase(8, error);
             }
           );
         };
         
       });

    });



  });

  next();

};

module.exports = level11;