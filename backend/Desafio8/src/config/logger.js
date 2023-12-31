import winston from "winston";

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "cyan",
    info: "blue",
    debug: "gray",
  },
};

const logger = winston.createLogger({
  levels: customLevelOpt.levels,
  transports: [
    new winston.transports.File({
      filename: "./errors.log",
      level: "fatal",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./loggers.log",
      level: "warning",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./loggers.log",
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

export const addLogger = (request, response, next) => {
  request.logger = logger;
  request.logger.info(
    `${request.method} es ${request.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};
