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

// Get quote by id
router.get(
  '/:id',
  middlewares.validateRequest(schemas.quoteIdSchema, 'params'),
  controllers.getQuoteById,
);

module.exports = router;
