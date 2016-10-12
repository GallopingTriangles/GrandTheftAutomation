var db = require('../db/index.js'); 
var bcrypt = require('bcrypt');              //encryption module for hash and salt
var config = require('../config/config.js'); //config file that stores sensitive information

/********************* USER CONTROLLER METHODS *************************
** The following methods correspond with specific endpoints following **
** '/users'. Please refer to userRoutes.js for more information. Each **
** of the methods below query the mysql database to either retrieve   **
** from or write to the User table. Every method herein contributes   **
** to the authorization process.                                      **
************************************************************************/
var userController = {

  /********************************************************************************** 
  ** Handles POST request by querying database with username to verify user exists.**
  ** Then uses bcrypt's (encryption module) native compare function to verify the  **
  ** plain-text password (sent in request) with encrypted password (from database).**
  ** If username and password are verified, user information is saved to local     **
  ** machine's session store.                                                      ** 
  ***********************************************************************************/
  login: (req, res, next) => {
    if (req.session.user) { //check if user is already logged in
      res.json({ message: 'A user is already logged in.' })
    } else {
      db.User.findOne({ where: { username: req.body.username } })
        .then(function(user) {
          if (user === null) { //if user does not exist, user returns null
            res.json({ message: 'Username does not exist.' })
          } else {
            bcrypt.compare(req.body.password, user.dataValues.password, function(err, response) {
              if (err || !response) { //if error or response returns 'false'
                res.status(400).json({ message: 'Incorrect password.' })
              } else {
                req.session.user = user.dataValues;
                req.session.save();
                res.status(200).json({ message: 'User is now logged in with session id.' });
              }
            })
          }
        })
    }   
  },

  /********************************************************************************** 
  ** Handles POST request by querying database with username to verify if user     **
  ** exists. If not, uses bcrypt to generate salt and hash supplied plain-text     **
  ** password to be combined with other supplied information to create a new user  **
  ** in the database.                                                              **
  ***********************************************************************************/
  signup: (req, res, next) => {
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        if (user === null) { //if user does not exist
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              var newUser = { //create newUser object to be inserted into db
                email: req.body.username,
                username: req.body.username,
                password: hash,
                salt: salt
              }
              db.User.create(newUser) //create user instance with newUser object
                .then(function(createdUser) {
                  res.status(201).json({ message: 'User successfully created!' });
                })
                .catch(function(err) {
                  // console.log('error creating new user: ', err);
                  res.sendStatus(400);
                })
            })
          })
        } else {
          res.status(200).json({ message: 'User already exists.' });
        }
      });
  },

  /* Handles GET request by destroying any session on local machine via express session.*/
  logout: (req, res, next) => {
    req.session.destroy(function(err) {
      if (err) {
        res.status(409).send({ message: 'Error destroying session...' }); 
      } else {
        // console.log('req.session is: ', req.session);
        res.status(202).send({ message: 'Session destroyed.' });
      }
    })
    
  }
}

/* exports userController and associated methods */
module.exports = userController;