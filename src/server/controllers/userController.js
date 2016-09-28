// == User requests and Authorization ==============================================

var db = require('../db/index.js'); // retrieve and write to mySQL database
var router = require('express').Router(); // routes for '/users' endpoint
var bcrypt = require('bcrypt'); //encryption module for hash and salt
var jwt = require('jsonwebtoken'); //module for generating web tokens
var config = require('../config.js');

var token = function(payload, secret) {
  return jwt.sign(payload, secret);
};

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
    //find user in database to retrieve salt and hashed password
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        if (user === null) {
          res.status(400).json({ message: 'Username does not exist.' })
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, response) {
            if (err) {
              res.status(400).json({ message: 'Incorrect password.' })
            } else {
              console.log('success response from bcrypt.compare: ', response);
              var userToken = token(req.body, config.secret);
              res.cookie('accessToken', userToken, { expires: new Date(Date.now() + 7200000) })
                .status(200)
                .json({ message: 'User is now logged in with token.' })
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
                //on failure, respond with status 404
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
    res.json('Loggin out');
  }
}

router.get('/', userController.verify, userController.getState); // returns user's saved stuff after verification

router.post('/login', userController.login); // authenticates the user when loggin in

router.post('/signup', userController.signup); // checks and creates a new user to the database

router.get('/logout', userController.logout); // wipes the session and logs the user out

module.exports = router;