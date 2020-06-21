import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as bunyanMiddleware from 'express-bunyan-logger';
import * as fg from 'fast-glob';
import * as helmet from 'helmet';
import * as fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';

import ErrorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import { responseHandler } from './middlewares/responseHandler';

async function start(): Promise<void> {
    let retry = false;
    do {
      try {
        await createConnection();
        retry = false;
      } catch(e) {
        console.log('ERROR in connecting to DB.... Retrying');
        retry = true;
        setTimeout(() => {}, 1500);
      }
   } while(retry)

    const app = express();

    // Register middlewares
    app.use(cors());
    app.use(helmet({ hidePoweredBy: true }));
    app.use(bodyParser.json());
    app.use(bunyanMiddleware({
        logger,
        parseUA: false,
        excludes: ['response-hrtime', 'req-headers', 'res-headers'],
        format: ':incoming :method :url :status-code',
    }));
    app.use(fileUpload({
        debug: true
    }));
    app.use(express.static(__dirname+'/save-files'));
    // Register routes
    const routes = await fg('./routes/*.ts', { cwd: __dirname });
    for (const routePath of routes) {
        const { default: router } = await import(routePath);
        if (typeof (router) === 'function') app.use(router);
    }

    app.use(responseHandler);

    // Error handler must come last...
    app.use(ErrorHandler);

    // Kick it off!
    app.listen(3200, async () => {
        logger.info({ port: 3200 }, 'Hey! I\'m listening...');
    });
}

start();
