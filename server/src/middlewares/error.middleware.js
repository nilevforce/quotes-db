const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;

  console.log(err);
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR;
  let { message } = err;

  if (!err.statusCode) {
    message = httpStatus[statusCode];
  }

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
