// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllor');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload-profile-image/:id', upload.single('myFile'), userController.uploadProfileImage);
router.get('/get-profile-image/:id', userController.getProfileImage);


module.exports = router;