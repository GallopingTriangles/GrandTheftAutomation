// == set up ===================================================
var express = require('express');
var bodyParser = require('body-parser');												// pull information from HTML POST
var morgan = require('morgan');																	// log requests to the console
var port = process.env.PORT || 8080;													  // set the port
var path = require('path');
var session = require('express-session');
var userRoutes = require('./routes/userRoutes.js');
var gameRoutes = require('./routes/gameRoutes.js');

var app = express();

// == configuration ============================================
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(morgan('dev'));                                         // log every request to the console
app.use(express.static(path.join(__dirname, '../../dist')));    // serve static files
app.use('/lib', (express.static(path.join(__dirname, '../../node_modules'))));

// == routes ===================================================

app.use('/users', userRoutes);                              // handles all requests to '/users'
app.use('/game', gameRoutes);                               // handles all requests to '/game'

// == listen ===================================================

app.listen(port, () => {
  console.log('app listening on port', port);
});