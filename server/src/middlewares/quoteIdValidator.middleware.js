const Joi = require('joi');
const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const quoteIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .messages({
      'any.required': 'Quote ID is required',
      'number.base': 'Invalid quote ID "{{#value}}": must be a number',
      'number.integer': 'Invalid quote ID "{{#value}}": must be an integer',
      'number.min': 'Quote ID must be integer in the range from 1 to 2147483647',
      'number.max': 'Quote ID must be integer in the range from 1 to 2147483647',
    }),
});

const validateQuoteId = (req, res, next) => {
  const { params } = req;
  const { error } = quoteIdSchema
    .validate(params);

  if (error) {
    const { message } = error.details[0];
    next(new ApiError(httpStatus.BAD_REQUEST, message));
  }

  next();
};

module.exports = validateQuoteId;
