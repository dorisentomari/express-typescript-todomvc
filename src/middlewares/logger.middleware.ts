import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';
import { formatTime } from '../helpers/time';

const today = formatTime(new Date(), false);

const normalFileName = `${today}-normal.log`;
const errorFileName = `${today}-error.log`;

const options = {
  file: {
    level: 'info',
    dirname: path.resolve(__dirname, '../../log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
};

const commonConfig = {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
};

const loggerMiddleware = {
  normalLogger: expressWinston.logger({
    transports: [
      new winston.transports.File({
        ...options.file,
        filename: normalFileName
      }),
      new winston.transports.Console(options.console)
    ],
    meta: true,
    msg: 'HTTP {{ req.method }} {{ req.url }}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function () {
      return false;
    },
    ...commonConfig
  }),
  errorLogger: expressWinston.errorLogger(({
    transports: [
      new winston.transports.File({
        ...options.file,
        filename: errorFileName
      }),
      new winston.transports.Console(options.console)
    ],
    ...commonConfig,
  }))
};

export default loggerMiddleware;
