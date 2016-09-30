// == User requests and Authorization ==============================================

var db = require('../db/index.js'); // retrieve and write to mySQL database
var bcrypt = require('bcrypt'); //encryption module for hash and salt
var config = require('../config/config.js'); //config file that stores sensitive information
// var passport = require('passport') // passport authentication module

var userController = {

  getState: (req, res, next) => {
    /* sends the logs and other information specific to that user */
    res.json({ message: 'Sends the state' });
  },

  login: (req, res, next) => {
    /*********************************************************************/
    /*********************************************************************/
    /************* HERE IS AN ERROR IN MAKING SESSION BECASE *************/
    /*********** LOADING THE PAGE MAKES A GET REQUEST TO /GAME ***********/
    /****** BUT THAT WON'T WORK BECAUSE THERE'S NO USER IN SESSION *******/
    /***** LOGGING IN WILL CREATE THE SESSION.... BUT THE PROBLEM IS *****/
    /*** WE NEED THE SESSION CREATED WHEN THE PAGE RENDERS B4 LOGGIN IN **/
    /*********************************************************************/
    /*********************************************************************/



    //find user in database to retrieve salt and hashed password
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        //if user does not exist, user returns null
        if (user === null) {
          res.status(400).json({ message: 'Username does not exist.' })
        } else {
          //if user exists, compare supplied plaintext password and encrypted password via bcrypt
          bcrypt.compare(req.body.password, user.dataValues.password, function(err, response) {
            //if error or response returns 'false'
            if (err || !response) {
              res.status(400).json({ message: 'Incorrect password.' })
            } else {
              //save user profile object into session
              console.log('HERE IS THE MOFUCKIN USER: ', user.dataValues);
              req.session.user = user.dataValues.username;
              res.status(200).json({ message: 'User is now logged in with session id.' });
            }
          })
        }
      })
  },

  signup: (req, res, next) => {
    //check if user exists
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        if (user === null) {
          bcrypt.genSalt(10, function(err, salt) {
            //generate hashed password w/ salt
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              //create newUser object to be inserted into db
              var newUser = {
                email: req.body.username,
                username: req.body.username,
                password: hash,
                salt: salt
              }
              //create user instance with newUser object
              db.User.create(newUser)
                //on success, respond with status 201 and message
                .then(function(createdUser) {
                  res.status(201).json({ message: 'User successfully created!' });
                })
                //on failure, respond with status 400
                .catch(function(err) {
                  console.log('error creating new user: ', err);
                  res.sendStatus(400);
                })
            })
          })
        } else {
          res.status(200).json({ message: 'User already exists.' });
        }
      });
  },

  logout: (req, res, next) => {
    /* wipe the session */
    /* wipe the tokens  */
    /* wipe your ass    */
    res.json('Loggin out');
  }
}

module.exports = userController;