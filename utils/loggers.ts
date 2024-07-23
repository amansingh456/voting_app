import winston from "winston";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, error, success, data }) => {
    return `${timestamp} [${level}]: ${message} | error: ${
      error ? error.message : "none"
    } | success: ${success} | data: ${JSON.stringify(data)}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});

export const printLog = (
  message: string,
  error: Error | null | unknown,
  success: boolean,
  data: any
): void => {
  logger.log({
    level: success ? "info" : "error",
    message,
    error,
    success,
    data,
  });
};

export default logger;
