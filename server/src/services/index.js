const fetchQuotes = require('./quotes/fetch-quotes.service');
const fetchQuoteById = require('./quotes/fetch-quote-by-id.service');
const fetchRandomQuotes = require('./quotes/fetch-random-quotes.service');
const fetchCategories = require('./categories/fetch-categories.service');
const fetchCategoryById = require('./categories/fetch-category-by-id.service');

module.exports = {
  fetchQuotes,
  fetchQuoteById,
  fetchRandomQuotes,
  fetchCategories,
  fetchCategoryById,
};
