var tutorial = function(req, res, next) {
  console.log('IN TUTORIAL');

  next();
};

module.exports = tutorial;