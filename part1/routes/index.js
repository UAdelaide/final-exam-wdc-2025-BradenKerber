var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
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
