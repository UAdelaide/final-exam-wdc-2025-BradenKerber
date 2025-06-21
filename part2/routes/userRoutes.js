const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // After successful login, creates a new session using the user_id and username
    req.session.user = { id: rows[0].user_id,
      username:rows[0].username,
    };
    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET route to logout
router.get('/logout', (req, res) => {
  // Get cookie to clear
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send("Error logging out");
    }
    // Clears cookies and sends success to vue
    res.clearCookie('connect.sid');
    res.status(200).send("logout successful");
    });
});

// Dogs owned by the user
router.get('/ownedDogs', async (req, res) => {
    try {
        const userid = 1;

        // Query the database for dogs owned by the user
        const [rows] = await database.query(`SELECT name AS dog_name FROM Dogs
          INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE user_id = 1`);
        res.json(rows);
    } catch (err) {
          console.error(err);
        res.status(500).send("Server error.");
    }
});


module.exports = router;