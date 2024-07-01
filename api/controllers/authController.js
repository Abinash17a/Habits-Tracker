const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login({ username, password });
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.register({ username, password });
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  login,
  register
};
