const httpStatus = require('http-status').default;
const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Method not Found'));
};

module.exports = notFound;
