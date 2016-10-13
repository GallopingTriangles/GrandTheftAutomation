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
  host: config.dbHost, 
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

/* sequelize method to establish Log table schemas and model */
var Log = sequelize.define('Log', {
  level: Sequelize.INTEGER,
  solution: Sequelize.TEXT('long'),
});

/* sequelize method to sync database OR create database if not already existing */
sequelize.sync(); 

/* The following methods are necessary to forming a foreign **
** key relationship between the User and Log tables, where  **
** each row in the Log table has a User table foreign key.  **/
User.hasMany(Log);
Log.belongsTo(User);

/* sequelize method to sync User/Log tables OR creates the **
** table(s), if they do not already exist.                 **/
User.sync();
Log.sync();

/* exports all routes */
module.exports = { sequelize, User, Log };
