import { Validator, Rule } from './index';

export default new Validator({
  email: Rule.create('Email')
    .isString()
    .isEmail()
    .label('Email'),
  password: Rule.create('Password')
    .isString()
    .isLength({ min: 8 }),
  secret: Rule.create('Secret').isString()
});
