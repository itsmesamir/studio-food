import path from 'path';

import express, { Application, Router, json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { addToStore, initializeStore } from '@/services/store';
import logger from '@/services/logger';

import { notFoundError, genericErrorHandler } from '@/middlewares/errorHandler';
import requestLogger from '@/middlewares/requestLogger';

import config from 'config';

const log = logger.withNamespace('app');

const appPath = path.join(__dirname, '../../app/build'); // Fixed build path reference

class App {
  public app: Application;

  constructor(routes: Router) {
    this.app = express();

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());

    this.app.use(express.static(path.join(appPath)));

    // Catch all non-API routes and serve index.html
    this.app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }

      return res.sendFile(path.join(appPath, 'index.html'));
    });

    this.app.set('trust proxy', true);
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(initializeStore());
    this.app.use(requestLogger);

    // Adding session to the store
    this.app.use(async (req, res, next) => {
      addToStore({ session: req.session });
      return next();
    });

    this.connectToDatabase();

    this.initializeAPIRoutes(routes);

    this.initializeErrorHandlers();
  }

  async connectToDatabase() {
    if (config.NODE_ENV !== 'test') {
      // await connectToDatabase();
    }
  }

  initializeAPIRoutes(routes: Router) {
    const baseURL = config.app.baseURL;
    this.app.use(baseURL, routes);
  }

  initializeUnhandelledErrorTracking() {
    Sentry.init({
      dsn: config.sentry.dsn,
      environment: config.sentry.environment,
    });

    this.app.use(Sentry.Handlers.requestHandler());

    process.on('unhandledRejection', err => {
      log.error(`Unhandled rejection ${err}`);
      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        log.error('Sentry error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });

    process.on('uncaughtException', err => {
      log.error('Unhandled exception', err);
      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        log.error('Sentry error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      log.info(`Server started at http://localhost:${port}`);
    });
  }

  private initializeErrorHandlers() {
    this.app.use(genericErrorHandler);
    this.app.use(notFoundError);
  }
}

export default App;
