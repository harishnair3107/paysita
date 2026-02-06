const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/hlrcheck', async (req, res) => {

  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ message: "number is required" });
  }

  try {

    const response = await axios.post(
      'https://sit.paysprint.in/service-api/api/v1/service/recharge/hlrapi/hlrcheck',
      {
        number: number,
        type: "mobile"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorisedkey": process.env.PAYSPRINT_AUTHORISED_KEY,
          "Token": process.env.PAYSPRINT_TOKEN
        }
      }
    );

    return res.json(response.data);

  } catch (error) {

    console.error(
      "HLR check failed:",
      error?.response?.data || error.message
    );

    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || { message: "HLR check failed" });
  }
});

module.exports = router;
