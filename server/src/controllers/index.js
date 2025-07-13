const getQuotes = require('./quotes/get-quotes.controller');
const getQuoteById = require('./quotes/get-quote-by-id.controller');
const getRandomQuotes = require('./quotes/get-random-quotes.controller');
const getCategories = require('./categories/get-categories.controller');
const getCategoryById = require('./categories/get-category-by-id.controller');

module.exports = {
  getQuotes,
  getRandomQuotes,
  getQuoteById,
  getCategories,
  getCategoryById,
};
