import { Validator, Rule } from './index';

export default new Validator({
  email: Rule.create('Email')
    .isString()
    .isEmail(),
  password: Rule.create('Password')
    .isString()
    .isLength({ min: 8 })
});
