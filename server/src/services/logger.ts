import winston, { Logger, createLogger, format, transports } from 'winston';

import { X_TRACE_ID } from '@/constants/headers';

import { getShortId, getFromStore } from './store';

interface CustomLogger extends Logger {
  withNamespace(namespace: string): winston.Logger;
}

const logFormat = format.printf(info => {
  const formattedNamespace = info.metadata.namespace || '';

  const requestID = getShortId();
  const formattedReqID = requestID || '';

  const traceId = getFromStore(X_TRACE_ID);

  return `${info.timestamp} [${info.level}] [${traceId}] [${formattedReqID}] [${formattedNamespace}]: ${info.message}`;
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize()),
      level: 'info',
    }),
  ],
}) as CustomLogger;

/**
 * Creates a child logger with namespace for logging.
 *
 * @param {String} namespace
 * @returns {Object}
 */
logger.withNamespace = function (namespace: string) {
  return logger.child({ namespace });
};

export default logger;
