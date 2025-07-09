const {
  errorConverter,
  errorHandler,
} = require('./error.middleware');
const successResponse = require('./success.middlware');
const requestLogger = require('./logger.middleware');
const notFoundHandler = require('./notFound.middleware');

module.exports = {
  successResponse,
  errorConverter,
  errorHandler,
  notFoundHandler,
  requestLogger,
};
