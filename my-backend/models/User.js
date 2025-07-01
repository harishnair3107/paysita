const db = require('../index'); // Import MySQL connection

const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255)
        )
    `;
    db.query(sql, (err) => {
        if (err) console.error('Error creating users table:', err);
        else console.log('✅ Users table ready');
    });
};

// Run table creation on startup
createUserTable();

module.exports = db;
