const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');   


// POST /auth/login - Login pengguna
router.post('/login', authController.login);

module.exports = router;