require('dotenv/config');
const { appConfig } = require('./src/config');

const db = require('./src/database/models');
const app = require('./src/app');
const logger = require('./src/logger');

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    app.listen(appConfig.port, () => {
      logger.info(`App is running on port ${appConfig.port}`);
    });
  } catch (error) {
    logger.error(`Database connection error: ${error}`);
    process.exit(1);
  }
};

startServer();
