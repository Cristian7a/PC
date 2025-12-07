import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../shared/errors/validation-error';

type Validatable = keyof Pick<Request, 'body' | 'params' | 'query' | 'headers'>;

const validate = (schemas: Partial<Record<Validatable, z.Schema>>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const [key, schema] of Object.entries(schemas)) {
        if (schema) {
          schema.parse(req[key as Validatable]);
        }
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError(error.issues, req.originalUrl));
      } else {
        next(new Error('Internal server error'));
      }
    }
  };
};

export { validate };
