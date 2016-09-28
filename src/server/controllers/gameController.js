var db = require('../db/index.js');

module.exports = {

  getGameState: (req, res, next) => {
    /* handles a GET request */
    /* returns the state of the game for that particular level and user */
    console.log('Received GET request to get game state');
    res.json('Received GET request to get game state'); // status code 200 for success
  },

  saveGameState: (req, res, next) => {
    /* handles a POST request                             */
    /* store the state of the code editor into the db     */
    /* req should contain the level and user and commands */
    var username = req.body.username;
    var level = req.body.level;
    var log = req.body.log;
    db.User.findOne({ where: { username: username }}).then(user => {
      if (!user) { 
        // handle error, but user should NOT be null since they must be logged in to save a solution
        console.log('Cannot find user');
        res.status(404).json('Processing error. Try again.');
      } else {
        var userId = user.dataValues.id;
        db.Log.create({
          level: level,
          solution: log,
          UserId: userId
        }).then(log => {
          res.status(200).json('User log successfully saved.');
        }).catch(err => {
          console.log('Error saving solution: ', err);
          res.status(404).json('Processing error. Try again.');
        });
      }
    }).catch(err => {
      res.status(404).json('Processing error. Try again.');
    })
  },

  updateGameState: (req, res, next) => {
    /* handles a PUT request */
    /* updates the saved commands for user for a particular level
               to a set of new commands that the user has entered */
    console.log('Received PUT request to update game state');
    res.json('Received PUT request to update game state'); // status code 204 for success
  }
}