const express = require("express");
const router = express.Router();
const pool = require("../db");   // adjust path if needed
const bcrypt = require("bcrypt");

router.get("/has-passcode/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.promise().execute(
  "SELECT 1 FROM passcode WHERE user_id = ? LIMIT 1",
  [userId]
);


    return res.json({
      hasPasscode: rows.length > 0
    });

  } catch (err) {
    console.error("has-passcode api error:", err);
    return res.status(500).json({ message: "internal error" });
  }
});
router.post("/set-passcode", async (req, res) => {
  const { userId, passcode } = req.body;

  if (!userId || !passcode) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const hashedPasscode = await bcrypt.hash(passcode, 10); // ✅ hash here

    const sql = `
      INSERT INTO passcode (user_id, passcode_hash)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
        passcode_hash = VALUES(passcode_hash)
    `;

    await pool.promise().execute(sql, [userId, hashedPasscode]);

    return res.json({ success: true });

  } catch (err) {
    console.error("set-passcode api error:", err);
    return res.status(500).json({ message: err.message });
  }
});
router.post("/verify-passcode", async (req, res) => {
  const { userId, passcode } = req.body;

  if (!userId || !passcode) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const [rows] = await pool
      .promise()
      .execute(
        "SELECT passcode_hash FROM passcode WHERE user_id = ? LIMIT 1",
        [userId]
      );

    if (rows.length === 0) {
      return res.json({ valid: false });
    }

    const hash = rows[0].passcode_hash;

    const isMatch = await bcrypt.compare(passcode, hash);

    return res.json({ valid: isMatch });

  } catch (err) {
    console.error("verify-passcode api error:", err);
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;
