const quotesQuerySchema = require('./quotes/quotes-query.schema');
const quoteIdSchema = require('./quotes/quote-id.schema');
const randomQuotesQuerySchema = require('./quotes/random-quotes-query.schema');

module.exports = {
  quoteIdSchema,
  quotesQuerySchema,
  randomQuotesQuerySchema,
};
