const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();
const FlightRoute = require('./routes/FlightRoute');
const AuthRoutes = require('./routes/auth'); // ✅ Correct import
const { v4: uuidv4 } = require('uuid');
const hlrCheckRoute = require('./routes/hlrCheck'); // 👈 Use correct case (capital C)

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api', hlrCheckRoute);
// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myappdb',
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Backend is running...');
});
app.use("/api", FlightRoute);
app.use("/api/auth", AuthRoutes); // ✅ Correct usage

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
// server.js or routes/token.js
// JWT Token Utilities
const jwt = require('jsonwebtoken');

// Base64-encoded secret key
const secretKey = 'UFMwMDYxMzU2YjI2NDQ1MjI1NmMwNWE2MGQzMTZjNmY0ODc3MzhmOTE3NDcyODY5NDY=';

const generateReqId = () => {
  return `REQ_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const getTimestamp = () => Math.floor(Date.now() / 1000);

// Flexible token generator with product name
const getToken = (product = 'WALLET') => {
  return jwt.sign(
    {
      timestamp: getTimestamp(),
      partnerId: 'PS006135',
      product: product,
      reqid: generateReqId()
    },
    secretKey,
    {
      algorithm: 'HS256',
      header: {
        typ: 'JWT',
        alg: 'HS256'
      }
    }
  );
};

// Endpoint to return 2 tokens
app.get('/api/token', (req, res) => {
  const token1 = getToken('WALLET');
  const token2 = getToken('WALLET');
 const token3 = getToken('WALLET');


  res.json({ token1, token2,token3 });
});

app.post('/submit-general', (req, res) => {
  const { name, contact, email, insuranceType, additionalCoverage } = req.body;

const query = `
  INSERT INTO general_insurance 
  (name, contact, email, insuranceType, additionalCoverage) 
  VALUES (?, ?, ?, ?, ?)
`;
  db.query(
    query,
    [
      name,
      contact,
      email,
      JSON.stringify(insuranceType),  // convert array to string
      JSON.stringify(additionalCoverage)
    ],
    (err, result) => {
      if (err) {
        console.error('DB Insert Error:', err);
        return res.status(500).json({ message: 'DB insert failed' });
      }
      res.status(200).json({ message: 'Success' });
    }
  );
});
//heath insurance
app.post('/submit-health', (req, res) => {
  const {
    contact,
    email,
    age,
    coverAmount,
    diseases,
    medicalHistory,
    badHabits,
    familyCount
  } = req.body;

  const query = `
    INSERT INTO health_insurance 
    (contact, email, age, coverAmount, diseases, medicalHistory, badHabits, familyCount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      contact,
      email,
      age,
      coverAmount,
      JSON.stringify(diseases),
      JSON.stringify(medicalHistory),
      JSON.stringify(badHabits),
      familyCount
    ],
    (err, result) => {
      if (err) {
        console.error('Health Insert Error:', err);
        return res.status(500).json({ message: 'Insert failed' });
      }
      res.status(200).json({ message: 'Health insurance submitted successfully' });
    }
  );
});



// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
