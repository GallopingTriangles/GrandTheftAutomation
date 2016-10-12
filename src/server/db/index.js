var Sequelize = require('sequelize');
var config = require('../config/config.js');

/********************** DATABASE CONFIGURATION *************************
** The following code configures a mysql database with two tables:    **
** User and Log. We are using sequelize ORM to handle database and    **
** table creation, and table management.                              **
************************************************************************/

/* This variable instantiates a new mysql database via sequelize with 
the following parameters: (databaseName, username, password, options) */
var sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: 'localhost', 
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


/* sequelize method to test connection to database */
sequelize.authenticate()
  .then(function(err) {
      console.log('successful connection to database!')
  })
  .catch(function(err) {
    console.log('error connecting to db: ', err);
  })

/* sequelize method to establish User table schemas and model */
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  email: Sequelize.STRING
});

// //Attaches sequelize User schema/model to passport
// passportLocalSequelize.attachToUser(User, {
//   usernameField: 'username',
//   passwordField: 'password',
//   saltField: 'salt',
//   emailField: 'email'
// });

/* sequelize method to establish Log table schemas and model */
var Log = sequelize.define('Log', {
  level: Sequelize.INTEGER,
  solution: Sequelize.TEXT('long'),
});

// should create the database 'gta' if it doesn't already exist
// CURRENTLY NOT WORKING, DATABASE IS BEING MANUALLY CREATED IN MYSQL
sequelize.sync();

//Creates a userId FOREIGN KEY in Log table
User.hasMany(Log);
Log.belongsTo(User);

//Creates table if table does not exist
User.sync();
Log.sync();

module.exports = { sequelize, User, Log };
