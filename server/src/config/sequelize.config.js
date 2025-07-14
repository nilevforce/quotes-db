const appConfig = require('./app.config');

const sequelizeConfig = {
  development: {
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.name,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
  test: {
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.testName,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
  production: {
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.name,
    host: appConfig.database.host,
    port: appConfig.database.port,
    dialect: 'postgres',
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
};

module.exports = sequelizeConfig;
