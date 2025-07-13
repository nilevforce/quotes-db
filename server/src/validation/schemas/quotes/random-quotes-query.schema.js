const Joi = require('joi');

const limit = Joi.number()
  .min(1)
  .max(20);

const randomQuotesQuerySchema = Joi.object({
  limit,
});

module.exports = randomQuotesQuerySchema;
