// == User requests and Authorization ==============================================

var db = require('../db/index.js'); // retrieve and write to mySQL database
var router = require('express').Router(); // routes for '/users' endpoint
var bcrypt = require('bcrypt'); //encryption module for hash and salt
var jwt = require('jsonwebtoken'); //module for generating web tokens

var userController = {
  verify: (req, res, next) => {
    /* verify if the user is a valid user */
    //check if username is found
    //compare passwords
      // on success, next()
      // on failure, redirect to /login
    next();
  },

  getState: (req, res, next) => {
    /* sends the logs and other information specific to that user */
    res.json('Sends the state');
  },

  login: (req, res, next) => {

  },

  signup: (req, res, next) => {
    //check if user exists
    if ( !db.User.findOne({ username: req.body.username }) ) {
      //generate salt 
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
            //on failure, respond with status 404
            .catch(function(err) {
              console.log('error creating new user: ', err);
              res.sendStatus(404);
            })
        })
      })
    } else {
      //if user exists, send status 200 and message
      res.status(200).json({ message: 'User already exists.' })
    }
  },

  logout: (req, res, next) => {
    res.json('Loggin out');
  }
}

router.get('/', userController.verify, userController.getState); // returns user's saved stuff after verification

router.post('/login', userController.login); // authenticates the user when loggin in

router.post('/signup', userController.signup); // checks and creates a new user to the database

router.get('/logout', userController.logout); // wipes the session and logs the user out

module.exports = router;