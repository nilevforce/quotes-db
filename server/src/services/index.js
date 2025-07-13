const fetchQuotes = require('./quotes/fetch-quotes.service');
const fetchQuoteById = require('./quotes/fetch-quote-by-id.service');
const fetchRandomQuotes = require('./quotes/fetch-random-quotes.service');

module.exports = {
  fetchQuotes,
  fetchQuoteById,
  fetchRandomQuotes,
};
