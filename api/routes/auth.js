const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;


//URl=http://localhost:3000/auth/register --register
//params --username and hashpassword
//URl=http://localhost:3000/auth/login--login
//params --username and password
