const express = require('express');
const schemas = require('../validation/schemas');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get(
  '/',
  middlewares.validateRequest(schemas.categoriesQuerySchema, 'query'),
  controllers.getCategories,
);

router.get(
  '/:id',
  middlewares.validateRequest(schemas.categoryIdSchema, 'params'),
  controllers.getCategoryById,
);

module.exports = router;
