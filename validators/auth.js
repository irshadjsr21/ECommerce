const { body } = require('express-validator');

module.exports = {
  signup: [
    body('firstName')
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage('First name should be atleast 3 charecters long.'),
    body('lastName')
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage('Last name should be atleast 3 charecters long.'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.')
  ],

  login: [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is invalid.'),
    body('password')
      .trim()
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password should be minimun of 8 charecters.')
  ]
};
