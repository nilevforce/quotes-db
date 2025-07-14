require('dotenv/config');

const appConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  debug: process.env.APP_DEBUG === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};

module.exports = appConfig;
