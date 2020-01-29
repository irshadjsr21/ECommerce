const { body } = require('express-validator');

module.exports = {
  login: [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('secret')
      .trim()
      .isString()
      .withMessage('Secret is required.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.')
  ]
};
