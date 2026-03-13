import { z } from 'zod';

import { PersonNameSchema, DateSchema, createTextSchema } from '../common-primitives.schema';

import { CategorySchema } from '../categories/categories.schema';
/**
 * Schema for the Contact Form.
 * Validates user inquiries and quick quote requests before submission.
 */
export const contactFormSchema = z.object({
  name: PersonNameSchema,
  category: CategorySchema,
  date: DateSchema,
  message: createTextSchema('validation.message_required', 10, 500),
});
