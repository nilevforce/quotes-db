const Joi = require('joi');
const { paginationSchema } = require('../components/pagination.schema');

const authorSchema = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255);

const textSchema = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255);

const categorySchema = Joi
  .string()
  .optional()
  .trim()
  .min(1)
  .max(255);

// The schema for validating quotes request query parameters
const quotesQuerySchema = Joi.object({
  author: authorSchema,
  text: textSchema,
  category: categorySchema,
  ...paginationSchema,
});

module.exports = {
  quotesQuerySchema,
};
