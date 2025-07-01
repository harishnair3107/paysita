// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "Makeindia#5", // replace with your MySQL password
  database: 'indiyapay',
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;
