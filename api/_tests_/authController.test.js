// _tests_/authController.test.js
const { login, register } = require('../services/authService');
const { sql } = require('../config/db');
const bcrypt = require('bcrypt');

jest.mock('../config/db', () => ({
  sql: {
    query: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockUser = {
      username: 'user',
      password_hash: 'hashedpassword'
    };

    test('should return 401 if username does not exist', async () => {
      // Mock the database to return an empty array, simulating a non-existent user
      sql.query.mockResolvedValue({ recordset: [] });

      const result = await login({ username: 'nonexistent', password: 'password' });

      expect(result).toEqual({ status: 401, message: { success: false, message: 'Invalid username or password' } });
    //   expect(sql.query).toHaveBeenCalledWith(
    //     `SELECT * FROM users WHERE username = ${'nonexistent'}`
    //   );
    });

    test('should return 401 if password does not match', async () => {
      // Mock the database to return a user record
      sql.query.mockResolvedValue({ recordset: [mockUser] });
      // Mock bcrypt to simulate a password mismatch
      bcrypt.compare.mockResolvedValue(false);

      const result = await login({ username: 'user', password: 'wrongpassword' });

      expect(result).toEqual({ status: 401, message: { success: false, message: 'Invalid username or password' } });
    //   expect(sql.query).toHaveBeenCalledWith(
    //     `SELECT * FROM users WHERE username = ${'user'}`
    //   );
    //   expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', mockUser.password_hash);
    });

    test('should return 200 if login is successful', async () => {
      // Mock the database to return a user record
      sql.query.mockResolvedValue({ recordset: [mockUser] });
      // Mock bcrypt to simulate a successful password match
      bcrypt.compare.mockResolvedValue(true);

      const result = await login({ username: 'user', password: 'correctpassword' });

      expect(result).toEqual({ status: 200, message: { success: true } });
    //   expect(sql.query).toHaveBeenCalledWith(
    //     `SELECT * FROM users WHERE username = ${'user'}`
    //   );
    //   expect(bcrypt.compare).toHaveBeenCalledWith('correctpassword', mockUser.password_hash);
    });
  });

  describe('register', () => {
    test('should register a new user successfully', async () => {
      const newUser = {
        username: 'newuser',
        password: 'newpassword'
      };

      // Mock bcrypt to return a hashed password
      bcrypt.hash.mockResolvedValue('hashedpassword');
      // Mock the database to simulate successful insertion
      sql.query.mockResolvedValue({});

      const result = await register(newUser);

      expect(result).toEqual({ status: 200, message: { success: true } });
    //   expect(sql.query).toHaveBeenCalledWith(
    //     `INSERT INTO users (username, password_hash) VALUES (${newUser.username}, ${'hashedpassword'})`
    //   );
    //   expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 10);
    });
  });
});
