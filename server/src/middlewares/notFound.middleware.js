const httpStatus = require('http-status').default;
const { ApiError } = require('../utils');

const notFoundHandler = (req, res, next) => {
  const statusCode = httpStatus.NOT_FOUND;
  const message = httpStatus[statusCode];

  next(
    new ApiError({
      statusCode,
      message,
    }),
  );
};

module.exports = notFoundHandler;
