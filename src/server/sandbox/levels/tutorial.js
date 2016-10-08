var tutorial = function(req, res, next) {
  console.log('IN TUTORIAL');

  req.body.phaser = {};

  req.body.bugs = [];

  next();
};

module.exports = tutorial;