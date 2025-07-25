const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const logger = require('../logger');
const CustomError = require('../errors/CustomError');
const { getErrorMessage } = require('../utils');

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  logger.error({ message: `${err.stack}` });

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
        errors: err.details.map((item) => ({
          field: item.context.key !== undefined
            ? item.context.label
            : undefined,
          message: item.message,
        })),
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
