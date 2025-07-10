const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const config = require('./config/config');

const logLevels = {
  error: 0,
  warning: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = winston.createLogger({
  levels: logLevels,
  level: config.log,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    winston.format.printf(
      ({
        timestamp, level, message, logMetadata, stack,
      }) => `${timestamp} ${level} ${logMetadata || ''} ${message} ${stack || ''}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

logger.add(fileRotateTransport);

module.exports = logger;
