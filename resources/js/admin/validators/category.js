import Joi from '@hapi/joi';

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': `Name is required.`,
      'string.required': `Name is required.`
    }),
  slug: Joi.string()
    .required()
    .regex(new RegExp('^[A-Z-]+$', 'i'))
    .messages({
      'string.empty': `Slug is required.`,
      'string.required': `Slug is required.`,
      'string.pattern.base': `Slug should contain only alphabets and '-'.`
    }),
  parentCategoryId: Joi.optional(),
  canHaveDivisions: Joi.string()
    .required()
    .messages({
      'string.empty': `Please select one.`,
      'string.required': `Please select one.`
    })
});

export default schema;
