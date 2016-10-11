// == set up ===================================================
var express = require('express'),
    bodyParser = require('body-parser'),	 										  // pull information from HTML POST
    morgan = require('morgan'),																	// log requests to the console
    port = process.env.PORT || 8080,													  // set the port
    path = require('path'),                                     // node path module
    session = require('express-session'),                       // express-session is used for sessions
    MySQLStore = require('express-mysql-session'),              // enables session store creation in MySQL
    bcrypt = require('bcrypt'),                                 // encryption module
    userRoutes = require('./routes/userRoutes.js'),             // router file for all user related endpoints
    gameRoutes = require('./routes/gameRoutes.js'),             // router file for all game related endpoints
    config = require('./config/config.js'),                     // config file containing sensitive information
    db = require('./db/index.js'),                              // including database file here starts database
    gameController = require('./controllers/gameController.js');// gameController holds authentication function 

var app = express();

// == serve static assets =====================================
// serve static client-side files
app.use(express.static(path.join(__dirname, '../../dist')));    
// serve node_modules from post-compiled /lib file
app.use('/lib', (express.static(path.join(__dirname, '../../node_modules'))));  

// == middleware ==============================================
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(morgan('dev'));                                         // log every request to the console

// == mysql session store =====================================
var sessionStore = new MySQLStore({                             // initializes a mysql session store
  host: 'localhost',                                            // this property will change if/when app is deployed
  port: 3306,                                                   // this property will change if/when app is deployed
  user: config.dbUsername,                                      // mysql username
  password: config.dbPassword,                                  // mysql password for username above
  database: config.dbName                                       // mysql database name for project
});

// == express session ========================================= 
app.use(session({                                               // configures express session
  secret: config.secret,                                        // requires session secret to secure
  store: sessionStore,                                          // all sessions to be store in mysql session store (above)
  resave: false,                                                // will not force save sessions to store when sessions are not modified
  saveUninitialized: false,                                     // will not save session to store when new but not modified
  cookie: {                                                     // cookie options
    maxAge: 7200000                                             // sets expiration date of cookie in milliseconds beyond current server time
  }
}));
// == passport/authentication ===============================================
// app.use(passport.initialize());                                 // initializes passport
// app.use(passport.session());                                    // enables passport's persistent login session

// passport.use('local', new LocalStrategy(
//   function(username, password, done) {
//     console.log('I AM HERE!')
//     db.User.findOne({ where: { username: username } })
//       .then(function(user) {
//         if (user === null) {
//           return done(null, false)
//         } else {
//           bcrypt.compare(password, user.password, function(err, response) {
//             if (err || !response) {
//               return done(null, false)
//             } else {
//               return done(null, user);
//             }
//           })
//         }
//       })
//   }
// ));

// passport.serializeUser(function(user, done) {
//   console.log('inside serialize, user: ', user);
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   console.log('inside deserialize, id: ', id);
//   db.User.findById(id)
//     .then(function(user) {
//       if (user !== null) {
//         done(err, user);
//       }
//     })
// });

// == routes ===================================================

app.use('/users', userRoutes);                              // handles all requests to '/users'
app.use('/game', gameController.checkAuth, gameRoutes);     // handles all requests to '/game'

// == listen ===================================================

app.listen(port, () => {
  console.log('app listening on port', port);
});