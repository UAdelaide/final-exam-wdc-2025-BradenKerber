var express = require('express');
var router = express.Router();

/* In file api.js routed through /api */
router.get('/dogs', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.status(500).send("Could not connect to database.");
            return;
        }

        var query = "SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id";
        connection.query(query, function(error, rows) {
            connection.release();
            if (error) {
                res.status(500).send("Invalid query.");
            } else {
                res.status(200).json(rows);
            }
        });
    });
});

module.exports = router;