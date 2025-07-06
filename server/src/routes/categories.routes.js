const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.getCategories);
router.get('/:id', controllers.getCategoryById);

module.exports = router;
