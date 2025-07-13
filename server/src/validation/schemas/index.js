const quotesQuerySchema = require('./quotes/quotes-query.schema');
const quoteIdSchema = require('./quotes/quote-id.schema');
const randomQuotesQuerySchema = require('./quotes/random-quotes-query.schema');
const categoriesQuerySchema = require('./categories/categories-query.schema');
const categoryIdSchema = require('./categories/category-id.schema');

module.exports = {
  quoteIdSchema,
  quotesQuerySchema,
  randomQuotesQuerySchema,
  categoriesQuerySchema,
  categoryIdSchema,
};
