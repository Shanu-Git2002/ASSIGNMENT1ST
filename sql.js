const mysql = require('mysql');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodejs',
  });
  
  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS item_code_unit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    shift VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    engineer VARCHAR(255) NOT NULL,
    dayEngineerCount INT NOT NULL,
    code VARCHAR(255) NOT NULL,
    unit VARCHAR(255) NOT NULL
  )
`;

// Execute the SQL query to create the table
db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');
  }

});
  
  module.exports =db;