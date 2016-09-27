var mysql = require('mysql');

// == CREATES MYSQL DATABASE ==============================================
var connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'gta'
});

// == ESTABLISHES A CONNECTION W/ MYSQL DATABASE ==========================
connection.connect(function(err) {
  if (err) {
    console.log('error connecting to MySQL: ', err);
  } else {
    console.log('Connected as ID: ', connection.threadId);
  }
});

module.exports = connection;

