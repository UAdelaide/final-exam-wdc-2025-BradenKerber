var express = require('express');
var router = express.Router();

/* In file api.js routed through /api */
router.get('/dogs', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500).send("Could not connect to database.");
            return;
        }

        var query = "SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = User.user_id";
        connection.query(query, function(error, rows) {
            connection.release();
            if (error) {
                res.sendStatus(500).send("Invalid query.");
            }
            res.json(rows);
        });
    });
});

module.exports = router;