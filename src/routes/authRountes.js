const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllor');
const { validateLogin, handleValidationErrors, validateRegistration } = require('../utils/validators'); 

router.post('/register', validateRegistration, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login); 

module.exports = router;