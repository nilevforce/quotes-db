const Joi = require('joi');

const quoteId = Joi.number()
  .integer()
  .required();

const quoteIdSchema = Joi.object({
  id: quoteId,
});

module.exports = quoteIdSchema;
