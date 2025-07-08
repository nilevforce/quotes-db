const Joi = require('joi');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const quotesQuerySchema = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit must be at most 50',
    }),

  offset: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Offset must be a number',
      'number.integer': 'Offset must be an integer',
      'number.min': 'Offset cannot be negative',
    }),
});

const validateQuotesQuery = (req, res, next) => {
  const params = req.query;
  console.log(params);
  const { error } = quotesQuerySchema
    .validate(params);

  if (error) {
    const { message } = error.details[0];
    next(new ApiError(httpStatus.BAD_REQUEST, message));
  }

  next();
};

module.exports = validateQuotesQuery;
