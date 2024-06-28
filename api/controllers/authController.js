const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
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
