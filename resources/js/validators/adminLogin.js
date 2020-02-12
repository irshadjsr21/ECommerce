import { object, string } from '@hapi/joi';

const schema = object({
  email: string()
    .required()
    .email({ tlds: false })
    .messages({
      'string.empty': `Email is required.`,
      'string.required': `Email is required.`,
      'string.email': `Email is not valid.`
    }),
  password: string()
    .required()
    .min(8)
    .messages({
      'string.empty': `Password is required.`,
      'string.required': `Password is required.`,
      'string.min': `Password should be minimim of {#limit} characters.`
    }),
  secret: string()
    .required()
    .messages({
      'string.empty': `Secret is required.`,
      'string.required': `Secret is required.`
    })
});

export default schema;
