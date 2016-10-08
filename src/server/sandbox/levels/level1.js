var level1 = function(req, res, next) {
  console.log('IN LEVEL 1');

  next();
};

module.exports = level1;