const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    encrypt: true,
    instancename: process.env.DB_INSTANCE,
  },
  port: parseInt(process.env.DB_PORT),
};

async function checkDatabaseConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Failed to connect to database:', err);
  }
}

module.exports = { sql, config, checkDatabaseConnection };
