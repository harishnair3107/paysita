// routes/auth.js
const express = require('express');
const db = require('../db'); // Make sure db.js exists and exports the connection
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/createUser', (req, res) => {
  const { mobile, name } = req.body;

  if (!mobile || !name) {
    return res.status(400).json({ message: 'Mobile number and name are required' });
  }

  db.query('SELECT * FROM user WHERE mobile = ?', [mobile], (err, result) => {
    if (err) {
      console.error('DB SELECT Error:', err); // ✅ log error
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const insertQuery = 'INSERT INTO user (mobile, name) VALUES (?, ?)';
    db.query(insertQuery, [mobile, name], (err, result) => {
      if (err) {
        console.error('DB INSERT Error:', err); // ✅ log error
        return res.status(500).json({ message: 'Error saving user', error: err });
      }

      return res.status(201).json({
        message: 'User created successfully',
        userId: result.insertId,
        mobile,
        name
      });
    });
  });
});

router.get('/getUsers', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ users: results, userCount: results.length });
  });
});

// // GET all users
// router.get('/getUsers', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error('Error fetching users:', err);
//             return res.status(500).json({ message: 'Database error' });
//         }
//         console.log('Fetched users:', results);
//         res.json({ users: results, userCount: results.length });
//     });
// });


module.exports = router;
