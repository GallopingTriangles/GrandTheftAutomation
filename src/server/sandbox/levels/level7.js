// case: 2, // fail, didn't enable the engine
    // case: 3, // fail, drove STRAIGHT through the FIRST intersection and crashed
    // case: 4, // fail, turned LEFT at FIRST intersection but drove STRAIGHT through the SECOND intersection and crashed
    // case: 5, // fail, turned RIGHT at FIRST intersection and crashed
    // case: 6, // fail, turned LEFT at FIRST intersection but turned RIGHT at SECOND intersection and crashed
var vm = require('vm');

var level7 = function(req, res, next) {

  next();

};

module.exports = level7;