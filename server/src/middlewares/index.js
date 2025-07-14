const errorHandler = require('./error-handler.middleware');
const validateRequest = require('./validate-request');
const morgan = require('./morgan.middleware');
const cors = require('./cors.middleware');
const json = require('./json.middleware');

module.exports = {
  errorHandler,
  validateRequest,
  morgan,
  json,
  cors,
};
