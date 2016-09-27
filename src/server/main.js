// == set up ===================================================
var express = require('express');
var bodyParser = require('body-parser');												// pull information from HTML POST
var morgan = require('morgan');																	// log requests to the console
var port = process.env.PORT || 8080;													  // set the port
var path = require('path');
var session = require('express-session');
var routes = require('./routes/routes');
// == initializes mysql database ================================
var db = require('./db');

var app = express();

// == configuration ============================================
app.use(express.static('../client')); 													// set static files location
app.use(bodyParser.json());																			// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));							// parse application/x-www-form-urlencoded
app.use(morgan('dev')); 																				// log every request to the console

// == routes ===================================================
app.use('/api', routes);																				// api endpoints

// == listen ===================================================
app.listen(port, () => {
  console.log('app listening on port', port);
});