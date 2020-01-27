import Joi from '@hapi/joi';

const schema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'string.empty': `First name is required.`,
      'string.required': `First name is required.`
    }),
  lastName: Joi.string()
    .required()
    .messages({
      'string.empty': `Last name is required.`,
      'string.required': `Last name is required.`
    }),
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .messages({
      'string.empty': `Email is required.`,
      'string.required': `Email is required.`,
      'string.email': `Email is not valid.`
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.empty': `Password is required.`,
      'string.required': `Password is required.`,
      'string.min': `Password should be minimim of {#limit} characters.`
    })
});

export default schema;
