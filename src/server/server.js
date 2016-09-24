// == set up ===================================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var path = require('path');
var session = require('express-session');
var routes = require('./routes/routes');

var app = express();

// == configuration ============================================
app.use(express.static('../client')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // log every request to the console

// == routes ===================================================
app.use('/api', routes);

// == listen ===================================================
app.listen(port, () => {
  console.log('app listening on port', port);
});