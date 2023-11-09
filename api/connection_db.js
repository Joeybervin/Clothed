const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL:', err.message);
    console.error('Error details:', err);
  } else {
    console.log('Successfully connected to the PostgreSQL database. Database name:', process.env.POSTGRES_DB);
  }
});

module.exports = pool;