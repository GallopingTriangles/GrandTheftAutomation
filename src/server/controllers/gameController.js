var db = require('../db/index.js');
var sequelize = require('../db/index.js').sequelize;
var config = require('../config/config.js');

/********************* GAME CONTROLLER METHODS *************************
** The following methods correspond with specific endpoints following **
** '/game'. Please refer to gameRoutes.js for more information. Each  **
** of the methods below query the mysql database to either retrieve   **
** from, write to, and/or update specific tables. Additionally, the   **
** included checkAuth method is used for authentication in server.js. **
************************************************************************/

/* exports functions within object */
module.exports = {

  /* Queries database to verify sessionID stored in user's request, if it exists */
  checkAuth: (req, res, next) => {
    sequelize.query("select * from sessions where session_id = '" + req.sessionID + "'")
      .then(function(result) {
        return next();
      })
      .catch(function(err) {
        res.status(401).json({ message: 'User is not authorized. Please log in.' })
      })
  },

  /********************************************************************************** 
  ** Handles GET request by querying database with username to allocate userId.    **
  ** Uses retrieved userId to query Log table for all level solutions and responds **
  ** with array of level objects                                                   **
  ***********************************************************************************/
  getGameState: (req, res, next) => {
    var username = req.query.username;
    db.User.findOne({ where: { username: username }})
      .then( user => {
        if (!user) {
          res.send({message: 'Processing error. Try again'});
        } else {
          var userId = user.dataValues.id;
          db.Log.findAll({ where: { UserId: userId } })
            .then( logs => {
              var logsList = logs.map( log => {
                return {
                  level: log.dataValues.level,
                  solution: log.dataValues.solution
                }
              });
              res.send(logsList); 
            }).catch( err => {
              res.send({message:'Error getting game state'});
            })
        }
      }).catch( err => {
        console.log('Error getting game state');
      })
  },

  /********************************************************************************** 
  ** Handles POST request by querying database with username to allocate userId.   **
  ** Uses retrieved userId to query Log table for a specific level to update or    ** 
  ** create a new level entry for the user. This method also stores the state of   **
  ** the code editor into the database.                                            **
  ***********************************************************************************/
  saveGameState: (req, res, next) => {
    console.log('session: ', req.session);
    var username = req.body.username;
    var level = req.body.level;
    var solution = req.body.log;
    db.User.findOne({ where: { username: username }})
      .then(user => {
        if (!user) { 
          res.status(404).send({message: 'Processing error. Try again.'});
        } else {
          var userId = user.dataValues.id;
          db.Log.find({
            where: {
              level: level,
              UserId: userId
            }
          }).then(log => {
            // if a log doesn't exist for the user at that level, create it
            if (!log) { 
              db.Log.create({
                level: level,
                solution: solution,
                UserId: userId
              }).then( log => {
                // respond with phaser object and bug report
                res.status(200).json({phaser: req.body.phaser, bugs: req.body.bugs});
              }).catch( err => {
                console.log('Error saving solution: ', err);
                res.status(404).send({message: 'Processing error. Try again.'});
              });
            } else { // if it does exist, then update it with update method written below
              module.exports.updateGameState(req, res, next);
            }
          }).catch( err => {
            console.log('error searching: ', err);
          })
        }
      }).catch(err => {
        res.status(404).send({message: 'Processing error. Try again.'});
      })
  },


  /********************************************************************************** 
  ** Handles PUT request by querying database with username to allocate userId.    **
  ** Uses retrieved userId to query Log table for a specific level to update. This **
  ** method updates the Log table with a user's corresponding in-game commands.    ** 
  ***********************************************************************************/
  updateGameState: (req, res, next) => {
    var username = req.body.username;
    var level = req.body.level;
    var solution = req.body.log;
    db.User.findOne({ where: { username: username } })
      .then( user => {
        if (!user) {
          // this error should never occur because a user should be logged in
          res.status(404).send({message: 'Processing error. Try again'});
        } else {
          var userId = user.dataValues.id;
          db.Log.findOne({
            where: {
              level: level,
              UserId: userId
            } 
          }).then( log => {
            if (log) {
              log.update({ solution: solution })
                .then( () => {
                  // console.log('Updated log: ', log.dataValues);
                  res.send({ phaser: req.body.phaser, bugs: req.body.bugs });
                }).catch( err => {
                  // console.log('Error updating log: ', err);
                  res.status(404).send({message: 'Error updating solution'});
                })
            } else {
              res.status(404).send({message: 'Log does not exist.'});
            }
          }).catch(err => {
            // console.log('Error updating log: ', err);
            res.status(404).send({message: 'Error finding level.'});
          })
        }
      }).catch(err => {
        // console.log('Error looking for user: ', err);
        res.status(404).send({message: 'Error finding user. Try again.'});
      })
  }
}