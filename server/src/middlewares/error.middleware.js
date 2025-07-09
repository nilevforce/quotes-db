/* eslint-disable no-unused-vars */
const httpStatus = require('http-status').default;
const { ApiError } = require('../utils');

const errorConverter = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return next(err);
  }

  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[statusCode];

  const error = new ApiError({
    statusCode,
    message,
  });

  return next(error);
};

const errorHandler = (err, req, res, next) => res
  .status(err.statusCode).json(err.toJSON());

module.exports = {
  errorConverter,
  errorHandler,
};
