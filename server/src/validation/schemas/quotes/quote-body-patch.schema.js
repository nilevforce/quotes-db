const Joi = require('joi');

const text = Joi
  .string()
  .trim()
  .min(1)
  .max(255);

const author = Joi
  .string()
  .trim()
  .min(1)
  .max(255);

const categories = Joi
  .array()
  .items(
    Joi.string()
      .trim()
      .min(1)
      .max(255)
      .pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/i)
      .messages({
        'string.pattern.base': 'category must contain only letters, numbers, and single hyphens.',
      }),
  )
  .min(1)
  .unique();

const quoteBodyPatchSchema = Joi
  .object({
    text,
    author,
    categories,
  })
  .min(1)
  .required()
  .messages({
    'any.required': 'request body is required.',
  });

module.exports = quoteBodyPatchSchema;
