const express = require('express');
const controllers = require('../controllers');
const { validate } = require('../validation/middlewares/validateRequest');
const { quotesQuerySchema } = require('../validation/schemas/quotes.schema');

const router = express.Router();

router.get('/', validate(quotesQuerySchema, 'query'), controllers.getQuotes);
router.get('/:id', controllers.getQuoteById);

module.exports = router;
