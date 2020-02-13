import { Validator, Rule } from '../../validators';

export default new Validator({
  name: Rule.create('Name').isString(),
  slug: Rule.create('Slug')
    .isString()
    .regex(
      new RegExp('^[A-Z-]+$', 'i'),
      'Slug should contain alphabets and `-`.'
    ),
  parentCategoryId: Rule.create('Parent category').optional(),
  canHaveDivisions: Rule.create().withMessage('Please select one.')
});
