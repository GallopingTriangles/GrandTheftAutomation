// import the virtual machine module from node
var vm = require('vm');

// == GTA SANDBOX == //
var GtaSandbox = function() {
  this.setColor = 'var setColor = function(string) { testSetcolor.value = string; testSetcolor.calls++; };';
  this.setSpeed = 'var setSpeed = function(number) { testSetspeed.value = number; testSetspeed.calls++; };';
  this.enable = 'var enable = function(string) { testEnabled.values.push(string); testEnabled.calls++; };';
  this.turn = 'var turn = function(string) { testTurn.value = string; testTurn.calls++ };';
  this.setRoute = 'var setRoute = function(array) { testSetRoute.value = array; testSetRoute.calls++ };';
  this.reroute = 'gps.reroute = function() { testReroute.calls++; };';

  this.environment = {
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

// create a new DEFAULT sandbox with user input and sandbox options
GtaSandbox.prototype.create = function(userInput, options) {
	// create the total input
	var input = 
	  this.setColor 
	  + this.setSpeed 
	  + this.enable 
	  + this.turn 
	  + this.setRoute 
	  + this.reroute 
	  + userInput;

  // create a new script for the virtual machine
  var script = new vm.Script(input);

  // create a new context for the virtual machine and run the script in it
  var context = new vm.createContext(this.environment);
  script.runInContext(context);

  // return the new context
  return context; 
};

// sensor.front === true
GtaSandbox.prototype.sensorTrue = function(userInput) {
	this.environment.sensor.front = true;
  return this.create(userInput);
};

// map.intersection === true
GtaSandbox.prototype.mapTrue = function(userInput) {
	this.environment.map.intersection = true;
  return this.create(userInput);
};

// gps.intersection === 'left'
GtaSandbox.prototype.gpsLeft = function(userInput) {
	this.environment.gps.intersection = 'left';
  return this.create(userInput);
};

// gps.intersection === 'right'
GtaSandbox.prototype.gpsRight = function(userInput) {
	this.environment.gps.intersection = 'right';
  return this.create(userInput);
};

// gps.intersection === 'straight'
GtaSandbox.prototype.gpsStraight = function(userInput) {
	this.environment.gps.intersection = 'straight';
  return this.create(userInput);
};

module.exports = GtaSandbox;