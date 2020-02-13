import { Validator, Rule } from './index';

export default new Validator({
  email: Rule.create('Email')
    .isString()
    .isEmail(),
  firstName: Rule.create('First name').isString(),
  lastName: Rule.create('Last name').isString(),
  password: Rule.create('Password')
    .isString()
    .isLength({ min: 8 })
});
