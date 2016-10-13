// import the virtual machine module from node
var vm = require('vm');

var GtaSandbox = function() {
  this.setColor = 'var setColor = function(string) { testColor = input; };';
  this.setSpeed = 'var setSpeed = function(number) { testSpeed = input; };';
  this.enable = 'var enable = function(string) { testEnabled.values.push(input); testEnabled.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "gps") { testGps = true }; };';
  this.turn = 'var turn = function(string) { testTurn.value = input; testTurn.count++ };';
  this.setRoute = 'var setRoute = function(array) { route.directions = input; route.count++ };';
  this.reroute = 'gps.reroute = function() { testReroute++; };';

  this.sandbox = {
	  sensor: { front: false },
	  map: { intersection: false },
	  gps: { intersection: false },
	  testSetcolor: { value: undefined, calls: 0 },
	  testSetspeed: { value: undefined, calls: 0 },
	  testEnabled: { values: [], calls: 0 },
	  testTurn: { value: undefined, calls: 0 },
	  testSetRoute: { value: undefined, calls: 0 },
	  testReroute: { calls: 0 }
  };
};

// create a new sandbox with user input and sandbox options
GtaSandbox.prototype.create = function(input, options) {
  
};

module.exports = GtaSandbox;