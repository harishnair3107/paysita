const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ Add address
router.post("/", (req, res) => {
  const { userId, address, type } = req.body;

  if (!userId || !address || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const query = `
    INSERT INTO addresses (user_id, address, type)
    VALUES (?, ?, ?)
  `;

  db.query(query, [userId, address, type], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json({ id: result.insertId });
  });
});


// ✅ Get all addresses of a user
router.get("/:userId", (req, res) => {

  const userId = req.params.userId;

  const query = `
    SELECT id, address, type
    FROM addresses
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(result);
  });
});


// ✅ Delete address
router.delete("/:id", (req, res) => {

  const id = req.params.id;

  const query = `DELETE FROM addresses WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json({ message: "deleted" });
  });
});


module.exports = router;
