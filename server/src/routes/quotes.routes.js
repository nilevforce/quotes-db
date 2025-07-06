const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.getQuotes);
router.get('/:id', controllers.getQuoteById);

module.exports = router;
