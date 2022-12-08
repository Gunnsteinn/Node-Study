const { request, response } = require("express");
const expressPinoLogger = require("express-pino-logger");
const logger = require("../services/loggerService");

const loggerMidlleware = expressPinoLogger({
  logger: logger,
  autoLogging: false,
});

const logRequest = async (req = request, res = response, next) => {
  const { protocol, hostname, originalUrl } = req;
  const port = process.env.PORT || "8080";
  logger.info(
    `${req.method} to ${protocol}://${hostname}:${port}${originalUrl} route is accessed`
  );
  next();
};

module.exports = { loggerMidlleware, logRequest };
