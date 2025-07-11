const Joi = require('joi');

const paginationSchema = {
  limit: Joi
    .number()
    .integer()
    .min(1)
    .max(50)
    .default(5),

  offset: Joi
    .number()
    .integer()
    .min(1)
    .default(0),
};

module.exports = paginationSchema;
