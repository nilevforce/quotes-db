const Joi = require('joi');
const paginationSchema = require('../pagination.schema');

const author = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255);

const text = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255);

const category = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255)
  .pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/i)
  .messages({
    'string.pattern.base': 'сategory must contain only letters, numbers, and single hyphens.',
  });

const quotesQuerySchema = Joi.object({
  author,
  text,
  category,
  ...paginationSchema,
});

module.exports = quotesQuerySchema;
