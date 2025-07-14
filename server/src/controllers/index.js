const getQuotes = require('./quotes/get-quotes.controller');
const getQuoteById = require('./quotes/get-quote-by-id.controller');
const getRandomQuotes = require('./quotes/get-random-quotes.controller');
const createQuote = require('./quotes/create-quote.controller');
const updateQuoteById = require('./quotes/update-quote-by-id.controller');
const deleteQuoteById = require('./quotes/delete-quote-by-id.controller');

const getCategories = require('./categories/get-categories.controller');
const getCategoryById = require('./categories/get-category-by-id.controller');

module.exports = {
  getQuotes,
  getRandomQuotes,
  getQuoteById,
  createQuote,
  updateQuoteById,
  deleteQuoteById,
  getCategories,
  getCategoryById,
};
