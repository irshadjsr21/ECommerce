import Joi from '@hapi/joi';

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': `Name is required.`,
      'string.required': `Name is required.`
    }),
  price: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.base': `Price is required.`,
      'number.min': `Price should be greater than 0.`
    }),
  discountPrice: Joi.number()
    .allow('')
    .optional()
    .min(1)
    .messages({
      'number.base': `Discount price is required.`,
      'number.min': `Discount price should be greater than 0.`
    }),
  categoryId: Joi.string()
    .required()
    .messages({
      'string.empty': `Category is required.`,
      'string.required': `Category is required.`
    }),
  shortDescription: Joi.string()
    .required()
    .messages({
      'string.empty': `Short description is required.`,
      'string.required': `Short description is required.`
    }),
  description: Joi.string()
    .required()
    .messages({
      'any.required': 'Description is required.',
      'string.empty': `Description is required.`,
      'string.required': `Description is required.`
    })
});

export default schema;
