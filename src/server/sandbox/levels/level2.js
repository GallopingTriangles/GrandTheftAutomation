var level2 = function(req, res, next) {
  console.log('IN LEVEL 2');

  next();
};

module.exports = level2;