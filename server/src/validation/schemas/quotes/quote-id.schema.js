const Joi = require('joi');

const id = Joi.number()
  .integer()
  .required();

const quoteIdSchema = Joi.object({
  id,
});

module.exports = quoteIdSchema;
