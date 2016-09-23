// == set up ===================================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var path = require('path');
var session = require('express-session');

var app = express();

// == configuration ============================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// == routes ===================================================

// == listen ===================================================
app.listen(port, () => {
  console.log('listening on port', port);
});