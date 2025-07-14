const Joi = require('joi');

const text = Joi
  .string()
  .required()
  .trim()
  .min(1)
  .max(255);

const author = Joi
  .string()
  .required()
  .trim()
  .min(1)
  .max(255);

const categories = Joi
  .array()
  .items(
    Joi
      .string()
      .trim()
      .min(1)
      .max(255)
      .pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/i)
      .messages({
        'string.pattern.base': 'сategory must contain only letters, numbers, and single hyphens.',
      })
      .required(),
  )
  .min(1)
  .unique();

const quoteBodySchema = Joi.object({
  text,
  author,
  categories,
});

module.exports = quoteBodySchema;
