import { z } from 'zod';
import { UuidSchema, EntityNameSchema, DescriptionSchema } from '../common-primitives.schema';

export const CATEGORY_REQUIRED_MSG = 'validation.categoryIsRequired';

/**
 * Schema for the Category Entity.
 * Reuses common primitives for consistent validation across the monorepo.
 */
export const CategorySchema = z.object(
  {
    id: UuidSchema,
    name: EntityNameSchema,
    description: DescriptionSchema.optional().or(z.literal('')),
    icon: z.string().optional(),
  },
  { message: CATEGORY_REQUIRED_MSG },
);
