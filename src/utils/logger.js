import winston from 'winston';
const { combine, timestamp, printf, colorize, json } = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json(),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/log',
            level: 'warn',
        })
    ],
});

// DEV LOGGER
const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(
            {
                level: "debug"
            }
        ),
    ],
    level: "verbose",
});

//  QA Logger
const qaLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `errors-info.logs`,
            level: "info",
        }),
    ],
    level: "verbose",
});

// PROD LOGGER
const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `errors.log`,
            level: "warn",
        }),
    ],
    level: "http",
});

const loggersImplementation = {
    development: devLogger,
    qa: qaLogger,
    production: prodLogger,
};

export function dynamicLogger(req, res, next) {
    req.logger = loggersImplementation[`${process.env.NODE_ENV}`];
    next();
}
