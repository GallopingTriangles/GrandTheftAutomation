// == set up ===================================================
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),	 										// pull information from HTML POST
    morgan = require('morgan'),																	// log requests to the console
    port = process.env.PORT || 8080,													  // set the port
    path = require('path'),
    session = require('express-session'),                       // express-session is used for sessions
    MySQLStore = require('express-mysql-session'),              // enables session store creation in MySQL
    passport = require('passport'),                             // passport is used for authentication
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    userRoutes = require('./routes/userRoutes.js'),
    gameRoutes = require('./routes/gameRoutes.js'),
    config = require('./config/config.js'),
    db = require('./db/index.js'),
    gameController = require('./controllers/gameController.js');

var app = express();

// == serve static assets ===================================
app.use(express.static(path.join(__dirname, '../../dist')));    // serve static files
app.use('/lib', (express.static(path.join(__dirname, '../../node_modules'))));

// == middleware ============================================
app.use(cookieParser(config.secret));
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(morgan('dev'));                                         // log every request to the console
// == session ===============================================
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
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 7200000),
    httpOnly: true,
    secure: false
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
app.use('/game', gameController.checkAuth, gameRoutes);      // handles all requests to '/game'

// == listen ===================================================

app.listen(port, () => {
  console.log('app listening on port', port);
});