const {
  getQuotes,
  getQuoteById,
} = require('./quotes.controller');
const { checkHealthz } = require('./healthz.controller');

module.exports = {
  getQuotes,
  getQuoteById,
  checkHealthz,
};
