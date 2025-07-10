const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const CustomError = require('../errors/CustomError');
const { getErrorMessage } = require('../utils');

const errorHandler = (err, req, res, next) => {
  let code = 'INTERNAL_SERVER_ERROR';
  let statusCode = StatusCodes[code];
  const message = getErrorMessage(err) || 'An unexpected error occurred';

  // Joi validation error
  if (Joi.isError(err)) {
    code = 'UNPROCESSABLE_ENTITY';
    statusCode = StatusCodes[code];
    return res.status(statusCode).json({
      error: {
        message: 'Validation error',
        code,
        errors: err.details.map((item) => ({ message: item.message })),
      },
    });
  }

  // Custom application error
  if (err instanceof CustomError) {
    code = err.errorCode || 'BAD_REQUEST';
    statusCode = err.statusCode || StatusCodes[code];
    return res.status(statusCode).json({
      error: {
        message: err.message,
        code,
      },
    });
  }

  // Fallback error
  return res.status(statusCode).json({
    error: {
      message,
      code,
    },
  });
};

module.exports = errorHandler;
