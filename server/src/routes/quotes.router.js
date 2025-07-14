const express = require('express');
const schemas = require('../validation/schemas');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

// Get quotes
router.get(
  '/',
  middlewares.validateRequest(schemas.quotesQuerySchema, 'query'),
  controllers.getQuotes,
);

// Get random quotes
router.get(
  '/random',
  middlewares.validateRequest(schemas.randomQuotesQuerySchema, 'query'),
  controllers.getRandomQuotes,
);

// Get quote by id
router.get(
  '/:id',
  middlewares.validateRequest(schemas.quoteIdSchema, 'params'),
  controllers.getQuoteById,
);

// Create quote
router.post(
  '/',
  middlewares.validateRequest(schemas.quoteBodySchema, 'body'),
  controllers.createQuote,
);

// Delete quote by id
router.delete(
  '/:id',
  middlewares.validateRequest(schemas.quoteIdSchema, 'params'),
  controllers.deleteQuoteById,
);

module.exports = router;
