var express = require('express');
var router = express.Router();
var database = require('../db');

/* In file api.js routed through /api */
router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await database.query("SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id");
        res.json(rows);
    } catch (err) {
        res.status(500).send("Server error.");
    }
});


router.get('/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await database.query(`SELECT request_id, name AS dog_name, requested_time, duration_minutes, location, username AS owner_username
            FROM WalkRequests INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE status = "Open"`);
        res.json(rows);
    } catch (err) {
        res.status(500).send("Server error.");
    }
});


router.get('/walkers/summary', async (req, res) => {
    try {
        const [rows] = await database.query(`SELECT username, COUNT(WalkRatings.rating) AS total_ratings, ROUND(AVG(rating), 1) AS average,
            COUNT(WalkRatings.rating_id) AS completed_walks  FROM Users LEFT JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id WHERE Users.role = 'walker'
            GROUP BY Users.user_id;`);
        res.json(rows);
    } catch (err) {
        res.status(500).send("Server error.");
    }
});


module.exports = router;