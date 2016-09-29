var db = require('../db/index.js');

module.exports = {

  getGameState: (req, res, next) => {
    /* handles a GET request */
    /* returns the state of the game (ALL level solutions) for that particular user */
    console.log('Received GET request to get game state');

    /* GET request must come with the username under params! */
    var username = req.query.username;
    db.User.findOne({ where: { username: username }}).then(user => {
      if (!user) {
        // user not logged in?
        res.send({message: 'Processing error. Try again'});
      } else {
        var userId = user.dataValues.id;
        db.Log.findAll({ where: {
          UserId: userId
        }}).then(logs => {
          var logsList = logs.map(log => {
            return {
              level: log.dataValues.level,
              solution: log.dataValues.solution
            }
          });
          res.send(logsList); // status code 200 for success
        }).catch(err => {
          console.log('error: ', err);
          res.send({message:'Error getting game state'});
        })
      }
    }).catch(err => {
      console.log('Error getting game state');
    })
  },

  saveGameState: (req, res, next) => {
    /* handles a POST request                             */
    /* store the state of the code editor into the db     */
    /* req should contain the level and user and commands */
    var username = req.body.username;
    var level = req.body.level;
    var solution = req.body.log;
    db.User.findOne({ where: { username: username }}).then(user => {
      if (!user) { 
        // handle error, but user should NOT be null since they must be logged in to save a solution
        console.log('Cannot find user');
        res.status(404).send({message: 'Processing error. Try again.'});
      } else {
        var userId = user.dataValues.id;
        db.Log.find({
          where: {
            level: level,
            UserId: userId
          }
        }).then(log => {
          if (!log) { // if a log doesn't exist for the user at that level, create it
            db.Log.create({
              level: level,
              solution: solution,
              UserId: userId
            }).then(() => {
              res.send({ type: 'save', message: 'User log successfully saved.' });
            }).catch(err => {
              console.log('Error saving solution: ', err);
              res.status(404).send({message: 'Processing error. Try again.'});
            });
          } else { // if it does exist, then update it
            module.exports.updateGameState(req, res, next);
          }
        }).catch(err => {
          console.log('error searching: ', err);
        })
      }
    }).catch(err => {
      res.status(404).send({message: 'Processing error. Try again.'});
    })
  },

  updateGameState: (req, res, next) => {
    /* handles a PUT request with a 204 status on success         */
    /* updates the saved commands for user for a particular level
               to a set of new commands that the user has entered */
    var username = req.body.username;
    var level = req.body.level;
    var solution = req.body.log;
    db.User.findOne({ where: { username: username }}).then(user => {
      if (!user) {
        // this error should never occur because a user should be logged in
        res.status(404).send({message: 'Processing error. Try again'});
      } else {
        var userId = user.dataValues.id;
        // find the log corresponding to the user
        db.Log.findOne({
          where: {
            level: level,
            UserId: userId
          }
        }).then(log => {
          // then update it
          if (log) {
            log.update({
              solution: solution
            }).then(() => {
              console.log('Updated log: ', log.dataValues);
              res.send({type: 'update', message: 'Updated solution'});
            }).catch(err => {
              console.log('Error updating log: ', err);
              res.status(404).send({message: 'Error updating solution'});
            })
          } else {
            // log didn't exist
            console.log('Log did not exist.. weird');
            res.status(404).send({message: 'Error updating solution'});
          }
        }).catch(err => {
          console.log('Error updating log: ', err);
          res.status(404).send({message: 'Error updating solution'});
        })
      }
    }).catch(err => {
      console.log('Error looking for user: ', err);
      res.status(404).send({message: 'Processing error. Try again.'});
    })
  }
}