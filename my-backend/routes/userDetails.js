const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { user_id, details } = req.body;

    if (!user_id || !details) {
      return res.status(400).json({
        message: "user_id and details are required",
      });
    }

    const detailsJson = JSON.stringify(details);

    const sql = `
      INSERT INTO user_additional_details (user_id, details)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
        details = VALUES(details)
    `;

    await db.execute(sql, [user_id, detailsJson]);

    return res.json({
      message: "Details saved successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;

