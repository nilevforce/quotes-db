const {
  getQuotes,
  getQuoteById,
} = require('./quotes.controller');

const {
  getCategories,
  getCategoryById,
} = require('./categories.controller');

module.exports = {
  getQuotes,
  getQuoteById,
  getCategories,
  getCategoryById,
};
