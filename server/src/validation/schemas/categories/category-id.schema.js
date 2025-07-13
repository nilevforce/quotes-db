const Joi = require('joi');

const id = Joi.number()
  .integer()
  .required();

const categoryIdSchema = Joi.object({
  id,
});

module.exports = categoryIdSchema;
