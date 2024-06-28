const { sql, config } = require('../config/db');
const bcrypt = require('bcrypt');

const login = async ({ username, password }) => {
  const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
  const user = result.recordset[0];

  if (!user) {
    return { status: 401, message: { success: false, message: 'Invalid username or password' } };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return { status: 401, message: { success: false, message: 'Invalid username or password' } };
  }

  return { status: 200, message: { success: true } };
};

const register = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await sql.query`INSERT INTO users (username, password_hash) VALUES (${username}, ${hashedPassword})`;
  return { status: 200, message: { success: true } };
};

module.exports = {
  login,
  register
};
