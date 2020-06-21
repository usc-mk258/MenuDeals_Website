import { Boom } from '@hapi/boom';
import { ValidationError } from '@hapi/joi';
import * as express from 'express';

export default function ErrorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
  const joiErr = err as ValidationError;
  if (joiErr.isJoi) {
    res.status(400).send({ success: false, message: joiErr.details[0].message });

    return next();
  }

  const boomErr = err as Boom;
  if (boomErr.isBoom) {
    res.status(boomErr.output.statusCode).send({ success: false, message: boomErr.message });

    return next();
  }

  switch (err.name) {
    case 'SyntaxError':
      res.status(400).send({ success: false, message: 'Invalid body syntax' });

      return next();
    default:
      res.status(500).send({
        success: false,
        message: err.message,
      });

      return next();
  }
}
