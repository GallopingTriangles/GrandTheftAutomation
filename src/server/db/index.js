var Sequelize = require('sequelize');
var config = require('../config/config.js');

/********************** DATABASE CONFIGURATION *************************
** The following code configures a mysql database with two tables:    **
** User and Log. We are using sequelize as an ORM to handle database  **
** and table creation, and table management.                          **
************************************************************************/

//Initializes MySQL database through instance of sequelize
var sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: 'localhost', /* Will need to change once server is deployed */
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


//tests connection to database
sequelize.authenticate()
  .then(function(err) {
      console.log('successful connection to database!')
  })
  .catch(function(err) {
    console.log('error connecting to db: ', err);
  })

//Creates table schemas/models for User
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

//Creates table schemas/models for User
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
