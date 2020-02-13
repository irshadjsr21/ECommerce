import { Validator, Rule } from '../../validators';

export default new Validator({
  name: Rule.create('Name'),
  price: Rule.create('Price').isInt({ min: 1 }),
  discountPrice: Rule.create('Discount price')
    .optional()
    .isInt({ min: 1 }),
  categoryId: Rule.create('Category'),
  shortDescription: Rule.create('Short description'),
  description: Rule.create('Description')
});
