import { z } from 'zod';
import {
  UuidSchema,
  EntityNameSchema,
  DescriptionSchema,
  RequiredPositiveNumberSchema,
} from '../common-primitives.schema';
import { RatingSchema } from '../core-business.schema';

export const SERVICES_REQUIRED_MSG = 'validation.servicesAreRequired';

/**
 * Schema for the PackageService Entity.
 * Represents a specific tier or bundle within a main service.
 */
export const PackageServiceSchema = z.object({
  id: UuidSchema,
  name: EntityNameSchema,
  description: DescriptionSchema.optional().or(z.literal('')),
  features: z.array(z.string().trim().min(1)),
  price: RequiredPositiveNumberSchema,
});

/**
 * Schema for the Main Service Entity.
 * Strictly mirrors the frontend/database interface.
 */
export const ServiceSchema = z.object({
  id: UuidSchema,
  name: EntityNameSchema,
  description: DescriptionSchema.optional().or(z.literal('')),
  image: z.string().nullable(),
  icon: z.string().min(1),
  price: RequiredPositiveNumberSchema,
  packages: z.array(PackageServiceSchema).nullable(),
  rating: RatingSchema.nullable(),
  features: z.array(z.string().trim().min(1)),
});

/**
 * Schema for an array of Service Entities.
 * Used in quotes, reviews, and orders to ensure at least one service is selected.
 */
export const ServicesArraySchema = z.array(ServiceSchema).min(1, SERVICES_REQUIRED_MSG);
