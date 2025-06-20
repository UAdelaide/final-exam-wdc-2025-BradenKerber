var express = require('express');
var router = express.Router();

router.get('/dogs', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('Issue');
            res.sendStatus(500);
            return;
        }

        var query = "SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = User.user_id";
        connection.query(query, function(error, rows, fields) {
            connection.release();
            if (error) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

module.exports = router;