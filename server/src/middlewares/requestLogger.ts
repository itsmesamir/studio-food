import { NextFunction, Request, Response } from 'express';

import logger from '@/services/logger';

const log = logger.withNamespace('middleware/requestLogger');

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  log.info(`${req.method} ${req.url} - ${res.statusCode} started`);

  res.on('finish', () => {
    const elapsedTime = Date.now() - startTime;

    log.info(`${req.method} ${req.url} - ${res.statusCode} - ${elapsedTime}ms completed`);
  });

  next();
};

export default requestLogger;
