// routes/hlrCheck.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
router.post('/hlrcheck', async (req, res) => {
  const { mobile } = req.body
  try {
    const response = await axios.post(
      'https://sit.paysprint.in/service-api/api/v1/service/recharge/hlrapi/hlrcheck',
      { mobile },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorisedkey: 'MWM5YTI1NjRiMTk3OTA2NDQ1M2EwY2RjMjc4NjVjNzI=',
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3NDg1MTMxNTYsInBhcnRuZXJJZCI6IlBTMDAxOTg2IiwicmVxaWQiOiI2NTc2NTM0MzI3NzY2NyJ9.TQF-wNXNA0YOouAalerJvYYEfv3qXgEa_-_M7ztSffo',
        },
      }
    );
    
  res.json(response.data);
  console.log(response.data);
  } catch (error) {
    console.error('HLR check failed:', error?.response?.data || error.message);
    res.status(500).json({ error: 'HLR check failed' });
  }
});

module.exports = router;


// const rechargePlans = async () => {
//   try {
//     setLoading(true);

//     const options = {
//       method: 'POST',
//       url: 'https://sit.paysprint.in/service-api/api/v1/service/recharge/hlrapi/browseplan',
//       headers: {
//         accept: 'application/json',
//         Token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQQVlTUFJJTlQiLCJ0aW1lc3RhbXAiOjE2MTAwMjYzMzgsInBhcnRuZXJJZCI6IlBTMDAxIiwicHJvZHVjdCI6IldBTExFVCIsInJlcWlkIjoxNjEwMDI2MzM4fQ.buzD40O8X_41RmJ0PCYbBYx3IBlsmNb9iVmrVH9Ix64',
//         'Content-Type': 'application/json',
//         Authorisedkey: 'MzNkYzllOGJmZGVhNWRkZTc1YTgzM2Y5ZDFlY2EyZTQ=',
//       },
//   data: {circle:circle, op: operator}
//     };

//     const res = await axios.request(options);
//     console.log("API Response:", res.data); // <--- Correct place

//     const allPlans = res.data || [];

//   } catch (error) {
//     console.error("Error fetching plans:", error.response?.data || error.message);
//   } finally {
//     setLoading(false);
//   }
// };