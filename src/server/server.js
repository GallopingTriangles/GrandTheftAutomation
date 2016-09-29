// == set up ===================================================
var express = require('express');
var bodyParser = require('body-parser');												// pull information from HTML POST
var morgan = require('morgan');																	// log requests to the console
var port = process.env.PORT || 8080;													  // set the port
var path = require('path');
var session = require('express-session');                       // express-session is used for sessions
var MySQLStore = require('express-mysql-session');              // enables session store creation in MySQL
var passport = require('passport');                             // passport is used for authentication
var userRoutes = require('./routes/userRoutes.js');
var gameRoutes = require('./routes/gameRoutes.js');
var config = require('./config.js');

var app = express();

// == configuration ============================================
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(morgan('dev'));                                         // log every request to the console
app.use(express.static(path.join(__dirname, '../../dist')));    // serve static files
app.use('/lib', (express.static(path.join(__dirname, '../../node_modules'))));
var sessionStore = new MySQLStore({                             // initializes a mysql session store
  host: 'localhost',
  port: 3306,
  user: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName
}); // WHEN TO CLOSE SESSION STORE? => sessionStore.close();
app.use(session({                                               // configures express session
  secret: config.secret,
  store: sessionStore,
  resave: false,
  cookie: {
    expires: new Date(Date.now() + 1000)
  }
}));
app.use(passport.initialize());                                 // initializes passport
app.use(passport.session());                                    // enables passport session support

// == routes ===================================================

app.use('/users', userRoutes);                              // handles all requests to '/users'
app.use('/game', gameRoutes);                               // handles all requests to '/game'

// == listen ===================================================

app.listen(port, () => {
  console.log('app listening on port', port);
});