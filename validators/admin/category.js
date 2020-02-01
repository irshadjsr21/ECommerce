const { body } = require('express-validator');

module.exports = {
  new: [
    body('name')
      .trim()
      .isString()
      .withMessage('Name is required.'),
    body('slug')
      .trim()
      .isString()
      .matches(new RegExp('^[A-Z-]+$', 'i'))
      .withMessage('Slug should contain only alphabets and "-".'),
    body('parentCategoryId').optional(),
    // .isUUID('4')
    // .withMessage('Parent category is invalid.'),
    body('canHaveDivisions')
      .isIn(['yes', 'no'])
      .withMessage('Can have divisions is invalid.')
  ]
};
