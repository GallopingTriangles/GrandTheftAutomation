var level1 = function(req, res, next) {
  console.log('IN LEVEL 1');

  req.body.phaser = {};

  req.body.bugs = [];

  next();
};

module.exports = level1;