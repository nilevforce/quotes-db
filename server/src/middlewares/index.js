const errorHandler = require('./error-handler.middleware');
const validateRequest = require('./validate-request');
const morganMiddleware = require('./morgan.middleware');

module.exports = {
  errorHandler,
  validateRequest,
  morganMiddleware,
};
