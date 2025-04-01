const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('first_name')
        .isLength({ min: 3, max: 30 })
        .withMessage('First name must be between 3 and 30 characters')
        .trim()
        .escape(),

    body('last_name')
        .isLength({ min: 3, max: 30 })
        .withMessage('Last name must be between 3 and 30 characters')
        .trim()
        .escape(),

    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

module.exports = { validateRegistration, handleValidationErrors, validateLogin };