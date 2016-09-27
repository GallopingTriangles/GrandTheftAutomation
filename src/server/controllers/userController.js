// == User requests and Authorization ==============================================

var db = require('../db/index.js'); // retrieve and write to mySQL database
var router = require('express').Router(); // routes for '/users' endpoint

var userController = {
  verify: (req, res, next) => {
    /* verify if the user is a valid user */
    next();
  },

  getState: (req, res, next) => {
    /* sends the logs and other information specific to that user */
    res.json('Sends the state');
  },

  login: (req, res, next) => {
    res.json('Logging in');
  },

  signup: (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
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