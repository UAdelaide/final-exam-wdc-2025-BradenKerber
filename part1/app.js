var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

var mysql = require('mysql2/promise');

let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      database: 'DogWalkSerivce'
    });

    // Insert data into table
    var [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
        await db.execute(`
            INSERT INTO Users (username, email, password_hash, role) VALUES
            ('alice123', 'alice@example.com', 'hashed123', 'owner'),
            ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
            ('carol123', 'carol@example.com', 'hashed789', 'owner')
            ('magnum', 'magnumpi@example.com', 'hashbrown', 'walker');
        `);
    }

    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
    await db.execute(`
        INSERT INTO Dogs (owner_id, name, size) VALUES
        ('1', 'Max', 'medium'),
        ('3', 'Bella', 'small');
    `);

    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
    await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location) VALUES
        ('1', '2025-06-10 08:00:00', '30', 'Parklands'),
        ('2', '2025-06-10 09:30:00', '45', 'Beachside Ave');
    `);

    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
        await db.execute(`
            INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating) VALUES
            ('1', '2', '1', '5'),
            ('2', '2', '3', '4');
        `);
    }

  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

module.exports = app;
