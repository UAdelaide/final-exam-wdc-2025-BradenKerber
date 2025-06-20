var express = require('express');
var router = express.Router();

router.get('/api/dogs', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        var query = "SELECT name AS dog_name, size, username AS owner_username FROM Dogs I"


  res.render('index', { title: 'Express' });
});