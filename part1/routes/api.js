var express = require('express');
var router = express.Router();

/* In file api.js routed through /api */
router.get('/dogs', async function(req, res) {
    try {
        const [rows] = await db.query(`
    SELECT bl.BookID, bi.Title, u.Name AS SellerName, bl.SellerID
    FROM BookListings bl
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
  `);
        req.pool.getConnection(function(err, connection) {
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
    } catch (err) {
        res.status(500).send("Could not connect to database.");
    }

});

module.exports = router;