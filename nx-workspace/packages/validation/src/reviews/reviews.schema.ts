import { z } from 'zod';

import { PersonNameSchema, createTextSchema } from '../common-primitives.schema';

import {
  ContractSchema,
  RatingSchema,
  CategorySchema,
  ServicesArraySchema,
} from '../core-business.schema';

/**
 * Schema for creating a new Review.
 * Ensures all business-critical information (contract, rating, services) is provided
 * alongside the user's feedback.
 */
export const createReviewSchema = z.object({
  name: PersonNameSchema,
  contract: ContractSchema,
  rating: RatingSchema,
  category: CategorySchema,
  services: ServicesArraySchema,
  comment: createTextSchema('validation.comment_required', 10, 1000),
});
