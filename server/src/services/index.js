const fetchQuotes = require('./quotes/fetch-quotes.service');
const fetchQuoteById = require('./quotes/fetch-quote-by-id.service');
const fetchRandomQuotes = require('./quotes/fetch-random-quotes.service');
const createQuote = require('./quotes/create-quote.service');
const updateQuoteById = require('./quotes/update-quote-by-id.service');
const deleteQuoteById = require('./quotes/delete-quote-by-id.service');

const fetchCategories = require('./categories/fetch-categories.service');
const fetchCategoryById = require('./categories/fetch-category-by-id.service');
const upsertCategories = require('./categories/upsert-categories.service');

module.exports = {
  fetchQuotes,
  fetchQuoteById,
  fetchRandomQuotes,
  createQuote,
  updateQuoteById,
  deleteQuoteById,
  fetchCategories,
  fetchCategoryById,
  upsertCategories,
};
