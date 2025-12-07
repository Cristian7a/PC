import { Request, Response, NextFunction } from 'express';
import { ProblemError } from '../shared/errors/problem-error';

export const problemDetailsMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let status = 500;
  let payload: Record<string, unknown>;

  if (err instanceof ProblemError) {
    status = err.status;
    payload = err.toProblemObject();
  } else {
    payload = {
      type: 'about:blank',
      title: 'Internal Server Error',
      status,
      detail: err instanceof Error ? err.message : 'Unknown error',
      instance: req.originalUrl,
    };
  }

  console.error(err);

  res.status(status).type('application/problem+json').json(payload);
};
