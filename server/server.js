require('dotenv/config');
const config = require('./src/config/config');
const app = require('./src/app');
const logger = require('./src/logger');

app.listen(config.port, () => {
  logger.info(`App is running on port ${config.port}`);
});
