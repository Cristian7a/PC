import jwt from 'jsonwebtoken';
import { NextFunction, Request, RequestAuth, Response } from 'express';
import { AppUserFromJWT } from '../models/user-model';
import { ENABLE_JWT_DEBUG, JWT_SECRET } from '../env.config';
import { ProblemError } from '../shared/errors/problem-error';

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    return next(
      new ProblemError({
        status: 401,
        title: 'Unauthorized',
        detail: ENABLE_JWT_DEBUG === 'true' ? 'No token provided' : 'Authentication required',
        instance: req.originalUrl,
      }),
    );
  }

  if (!token.startsWith('Bearer ')) {
    return next(
      new ProblemError({
        status: 401,
        title: 'Unauthorized',
        detail: ENABLE_JWT_DEBUG === 'true' ? 'Invalid token format' : 'Authentication required',
        instance: req.originalUrl,
      }),
    );
  }

  jwt.verify(token.replace('Bearer ', ''), JWT_SECRET as string, (err, user) => {
    if (err) {
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail:
            ENABLE_JWT_DEBUG === 'true' ? 'Failed token authentication' : 'Authentication required',
          instance: req.originalUrl,
        }),
      );
    }

    if (!user || typeof user === 'string') {
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail:
            ENABLE_JWT_DEBUG === 'true' ? 'Invalid user data in token' : 'Authentication required',
          instance: req.originalUrl,
        }),
      );
    }

    (req as RequestAuth).templateNodeUser = user as AppUserFromJWT;
    next();
  });
};

export { authenticateJWT };
