import { z } from 'zod';
import { DateSchema } from './common-primitives.schema';

export const CATEGORY_REQUIRED_MSG = 'validation.categoryIsRequired';
export const CONTRACT_REQUIRED_MSG = 'validation.contractIsRequired';
export const CONTRACT_INVALID_MSG = 'validation.invalidContractFormat';
export const SERVICES_REQUIRED_MSG = 'validation.servicesAreRequired';
export const EVENT_TYPE_REQUIRED_MSG = 'validation.eventTypeIsRequired';
export const EVENT_DATE_TOO_SOON_MSG = 'validation.eventDateTooSoon';
export const RATING_MIN_MSG = 'validation.ratingMin';
export const RATING_MAX_MSG = 'validation.ratingMax';

export const CONTRACT_REGEX = /^PYC-\d{4}-(0[1-9]|1[0-2])-\d{4}$/;

/**
 * Schema for validating Plato y Copa contract numbers.
 * Enforces the business-specific format: PYC-YYYY-MM-XXXX
 */
export const ContractSchema = z
  .string({ message: CONTRACT_REQUIRED_MSG })
  .trim()
  .min(1, CONTRACT_REQUIRED_MSG)
  .regex(CONTRACT_REGEX, CONTRACT_INVALID_MSG);

/**
 * Schema for validating arrays of services.
 * Used across quotes, reviews, and orders to ensure at least one service is selected.
 */
export const ServicesArraySchema = z.array(z.string()).min(1, SERVICES_REQUIRED_MSG);

/**
 * Schema for validating categories.
 * Used to classify events, food items, or gallery collections.
 */
export const CategorySchema = z
  .string({ message: CATEGORY_REQUIRED_MSG })
  .min(1, CATEGORY_REQUIRED_MSG);

/**
 * Schema for validating event types.
 * Represents the kind of event being quoted or organized (e.g., Wedding, Corporate).
 */
export const EventTypeSchema = z
  .string({ message: EVENT_TYPE_REQUIRED_MSG })
  .trim()
  .min(1, EVENT_TYPE_REQUIRED_MSG);

/**
 * Schema for Plato y Copa Event Dates.
 * Currently uses the generic Date validation compatible with UI DatePickers.
 * * TODO: Activate the 48-hour advance notice business rule when the Detailed Planner is implemented.
 */
export const EventDateSchema = DateSchema.superRefine((val, ctx) => {
  // TODO: Descomentar esta lógica en el futuro para forzar 48hrs de anticipación
  /*
  const now = new Date();
  const diffInMs = val.getTime() - now.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 48) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: EVENT_DATE_TOO_SOON_MSG,
    });
  }
  */
});

/**
 * Schema for 1-to-5 star ratings.
 * Used primarily in the reviews and feedback domains.
 */
export const RatingSchema = z
  .number()
  .int()
  .min(1, { message: RATING_MIN_MSG })
  .max(5, { message: RATING_MAX_MSG });
