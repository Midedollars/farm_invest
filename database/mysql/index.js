const mysql = require('mysql2');
const config = require("../../config/db")

// create the connection to database
const db = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  database: config.MYSQL_DATABASE,
  password : config.MYSQL_PASSWORD
});
db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
})

module.exports = db.promise()