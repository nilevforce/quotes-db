const getQuotes = require('./quotes/get-quotes.controller');
const getQuoteById = require('./quotes/get-quote-by-id.controller');
const getRandomQuotes = require('./quotes/get-random-quotes.controller');

module.exports = {
  getQuotes,
  getRandomQuotes,
  getQuoteById,
};
