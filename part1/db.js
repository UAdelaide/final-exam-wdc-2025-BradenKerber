const mysql = require('mysql2/promise');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'DogWalkService'
});

module.exports = dbConnectionPool;