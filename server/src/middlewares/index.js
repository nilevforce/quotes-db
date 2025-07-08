const {
  errorConverter,
  errorHandler,
} = require('./error.middleware');
const requestLogger = require('./requestLogger.middleware');
const notFound = require('./notFound.middleware');
const validateQuoteId = require('./quoteIdValidator.middleware');
const validateQuotesQuery = require('./quotesQueryValidator.middleware');

module.exports = {
  validateQuotesQuery,
  validateQuoteId,
  errorConverter,
  errorHandler,
  notFound,
  requestLogger,
};
