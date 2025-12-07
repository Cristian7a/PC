import { z } from 'zod';
import { ProblemError } from './problem-error';

export class ValidationError extends ProblemError<{
  validationErrors: z.core.$ZodIssue[];
}> {
  constructor(issues: z.core.$ZodIssue[], instance?: string) {
    super({
      status: 400,
      title: 'Validation Failed',
      detail: 'One or more fields are invalid.',
      instance,
      extensions: { validationErrors: issues },
    });
    this.name = 'ValidationError';
  }
}
