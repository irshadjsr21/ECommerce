const { body } = require('express-validator');

module.exports = {
  new: [
    body('name')
      .trim()
      .isString()
      .withMessage('Name is required.'),
    body('price')
      .trim()
      .isInt({ min: 0 })
      .withMessage('Price should be greater than 0.'),
    body('discountPrice')
      .optional()
      .trim()
      .isInt({ min: 0 })
      .withMessage('Discount price should be greater than 0.'),
    body('categoryId')
      .optional()
      .isUUID()
      .withMessage('Invalid category.'),
    body('shortDescription')
      .trim()
      .isString()
      .isLength({ min: 50, max: 255 })
      .withMessage('Short description should be between 50 to 255 charecters.'),
    body('description')
      .trim()
      .isString()
      .isLength({ min: 280 })
      .withMessage('Description should be min of 280 charecters.')
  ]
};
