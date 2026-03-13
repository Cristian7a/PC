import { z } from 'zod';
import { DateSchema } from './common-primitives.schema';

export const CONTRACT_REQUIRED_MSG = 'validation.contractIsRequired';
export const CONTRACT_INVALID_MSG = 'validation.invalidContractFormat';
export const SERVICES_REQUIRED_MSG = 'validation.servicesAreRequired';
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
  .min(1, { message: RATING_MIN_MSG })
  .max(5, { message: RATING_MAX_MSG });
