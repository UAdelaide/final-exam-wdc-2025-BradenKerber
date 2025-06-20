// use mysql in this app
var mysql = require('mysql');

// create a 'pool' (group) of connections to be used for connecting with our SQL server
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: ''
});

module.exports = dbConnectionPool;