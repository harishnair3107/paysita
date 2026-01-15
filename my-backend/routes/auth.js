// routes/auth.js
const express = require('express');
const db = require('../db'); // Make sure db.js exists and exports the connection
const router = express.Router();
const cors = require('cors');
const jwt=require('jsonwebtoken');
router.use(cors());
const generateToken=  (userId)=>{
   return jwt.sign({Id:userId},process.env.JWT_SECRET,{expiresIn:'7d'});
}
router.post("/createUser", (req, res) => {
  const { country_code, mobile, name } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const selectQuery =
    "SELECT * FROM user WHERE mobile = ? AND country_code = ?";

  db.query(selectQuery, [mobile, country_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    // ✅ Existing user
    if (result.length > 0) {
      return res.status(200).json({
        
          userId: result[0].id,
          mobile: result[0].mobile,
          name: result[0].name,
          countryCode: result[0].country_code,
          token: generateToken(result[0].id),
          isNewUser: false,
        
      });
    }

    // ✅ New user
    const insertQuery =
      "INSERT INTO user (country_code, mobile, name) VALUES (?, ?, ?)";

    db.query(insertQuery, [country_code, mobile, name], (err, insertResult) => {
      if (err) {
        return res.status(500).json({ message: "Error creating user" });
      }

      return res.status(201).json({
        
          userId: insertResult.insertId,
          mobile,
          name,
          countryCode: country_code,
          token: generateToken(insertResult.insertId),
          isNewUser: true,
      
      });
    });
  });
});

router.put("/updateName", (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({
      message: "userId and name are required",
    });
  }

  const query = "UPDATE user SET name = ? WHERE id = ?";

  db.query(query, [name, userId], (err, result) => {
    if (err) {
      console.error("DB UPDATE ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Name updated successfully",
      name,
    });
  });
});




router.post('/getUsers', (req, res) => {
  const { mobile, name } = req.body;

  if (!mobile || !name) {
    return res.status(400).json({ message: "Enter all fields" });
  }

  db.query(
    'SELECT * FROM user WHERE mobile = ? AND name = ?',
    [mobile, name],
    (err, results) => {

      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Enter valid credentials" });
      }

      // ✅ SUCCESS → only ONE response
      return res.status(201).json({
        message: "Logged in successfully",
        token: generateToken(results[0].id),
        user: {
          id: results[0].id,
          name: results[0].name,
          mobile: results[0].mobile,
          countryCode:results[0].country_code,
        }
      });
    }
  );
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
