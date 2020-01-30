import Joi from '@hapi/joi';

const schema = Joi.object({
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
    }),
  secret: Joi.string()
    .required()
    .messages({
      'string.empty': `Secret is required.`,
      'string.required': `Secret is required.`
    })
});

export default schema;
