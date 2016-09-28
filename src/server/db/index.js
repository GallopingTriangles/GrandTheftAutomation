var Sequelize = require('sequelize');
var config = require('../config.js');

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

//Creates table schemas/models
var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  email: Sequelize.STRING
});

var Log = sequelize.define('Log', {
  level: Sequelize.INTEGER,
  solution: Sequelize.TEXT('long')
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

module.exports = { User, Log };

