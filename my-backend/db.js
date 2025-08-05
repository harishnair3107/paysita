// db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myappdb',
  waitForConnections: true,
  connectionLimit: 10, // number of connections
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool Connection Failed:", err);
  } else {
    console.log("✅ MySQL Pool Connected Successfully");
    connection.release(); // release back to pool
  }
});

module.exports = pool;
