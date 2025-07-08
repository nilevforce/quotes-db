const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../../../middlewares');

const router = express.Router();

router.get('/', middlewares.validateQuotesQuery, controllers.getQuotes);
router.get('/:id', middlewares.validateQuoteId, controllers.getQuoteById);

module.exports = router;
