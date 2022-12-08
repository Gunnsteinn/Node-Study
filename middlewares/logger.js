const expressPinoLogger = require("express-pino-logger");
const logger = require("../services/loggerService");

const loggerMidlleware = expressPinoLogger({
  logger: logger,
  autoLogging: false,
});

module.exports = { loggerMidlleware };
