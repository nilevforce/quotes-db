const Joi = require('joi');
const paginationSchema = require('../pagination.schema');

const name = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255)
  .pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/i)
  .messages({
    'string.pattern.base': 'name must contain only letters, numbers, and single hyphens.',
  });

const categoriesQuerySchema = Joi.object({
  ...paginationSchema,
  name,
});

module.exports = categoriesQuerySchema;
