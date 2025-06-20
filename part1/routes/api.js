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
            FROM WalkRequests INNER JOIN Dogs ON Dogs.owner_id = Users.user_id`);
        res.json(rows);
    } catch (err) {
        res.status(500).send("Server error.");
    }
});


module.exports = router;