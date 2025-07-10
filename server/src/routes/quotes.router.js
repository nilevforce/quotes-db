const express = require('express');
const { quotesQuerySchema } = require('../validation/schemas/quotes.schema');
const { validateRequest } = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', validateRequest(quotesQuerySchema, 'query'), controllers.getQuotes);

module.exports = router;
