import { z } from 'zod';
import { ValidationSettings } from './settings';

// GENERIC ERROR CONSTANTS
export const NAME_REQUIRED_MSG = 'validation.nameIsRequired';
export const INVALID_PERSON_NAME_MSG = 'validation.invalidPersonName';
export const DESCRIPTION_REQUIRED_MSG = 'validation.descriptionIsRequired';
export const TEXT_TOO_LONG_MSG = 'validation.textTooLong';
export const TEXT_TOO_SHORT_MSG = 'validation.textTooShort';
export const DATE_REQUIRED_MSG = 'validation.dateIsRequired';
export const INVALID_DATE_FORMAT_MSG = 'validation.invalidDateFormat';
export const PHONE_INVALID_MSG = 'validation.invalidPhoneNumber';
export const INVALID_UUID_MSG = 'validation.invalidUuid';
export const NUMBER_REQUIRED_MSG = 'validation.numberIsRequired';
export const INVALID_NUMBER_MSG = 'validation.invalidNumber';
export const NUMBER_MIN_ZERO_MSG = 'validation.numberMinZero';

// GENERIC REGEX
export const PERSON_NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const MIN_LENGTH = 3;

// TEXT AND NAME SCHEMAS

/**
 * Schema for general entity names (e.g., Categories, Items, General Objects).
 * Allows for numbers and special characters.
 */
export const EntityNameSchema = z.string().min(MIN_LENGTH, NAME_REQUIRED_MSG);

/**
 * Strict schema for person names (e.g., Auth, Contact, Reviews).
 * Validates that the string does not contain numbers or unusual symbols.
 */
export const PersonNameSchema = z
  .string({ message: NAME_REQUIRED_MSG })
  .trim()
  .min(MIN_LENGTH, NAME_REQUIRED_MSG)
  .max(100, TEXT_TOO_LONG_MSG)
  .regex(PERSON_NAME_REGEX, INVALID_PERSON_NAME_MSG);

/**
 * Factory function to generate consistent long text schemas.
 * Useful for descriptions, comments, and messages.
 * Fails fast if empty to avoid duplicate min/max errors.
 */
export const createTextSchema = (
  requiredMsg = DESCRIPTION_REQUIRED_MSG,
  minLength = 10,
  maxLength = 1000,
) =>
  z
    .string({ message: requiredMsg })
    .trim()
    .min(1, requiredMsg)
    .refine((val) => val.length === 0 || val.length >= minLength, { message: TEXT_TOO_SHORT_MSG })
    .refine((val) => val.length <= maxLength, { message: TEXT_TOO_LONG_MSG });

/** * Default schema for generic descriptions.
 */
export const DescriptionSchema = createTextSchema(DESCRIPTION_REQUIRED_MSG, MIN_LENGTH, 500);

/**
 * Schema for generic dates.
 * Uses coerce.date() to gracefully handle native Date objects (e.g., from PrimeNG Calendar)
 * or ISO date strings.
 * Note: coerce transforms 'undefined' to 'Invalid Date', so 'message' covers both missing and invalid formats.
 */
export const DateSchema = z.coerce.date({
  message: INVALID_DATE_FORMAT_MSG,
});

// COMMON DATA SCHEMAS (Phones, UUIDs, Numbers)

/**
 * Schema for Phone Numbers.
 * Allows digits, spaces, hyphens, and an optional leading plus sign.
 * Validates typical international and local formats.
 */
export const PhoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, PHONE_INVALID_MSG);

/**
 * Schema for required positive numbers.
 * Fails if undefined or less than zero.
 */
export const RequiredPositiveNumberSchema = z
  .number({
    error: (issue) => (issue.input === undefined ? NUMBER_REQUIRED_MSG : INVALID_NUMBER_MSG),
  })
  .min(0.0, NUMBER_MIN_ZERO_MSG);

/**
 * Schema to validate a UUID string.
 * Pre-processes 'null' or empty strings into actual null for Zod's .nullable() type safety.
 */
export const PreprocessedUuidSchema = z.preprocess(
  (a) => (a === 'null' || a === '' ? null : a),
  z.string().uuid(INVALID_UUID_MSG).nullable(),
);

/**
 * Schema to validate a strict UUID string.
 * Trims the input string before validation.
 */
export const UuidSchema = z.string().trim().pipe(z.uuid(INVALID_UUID_MSG));

/**
 * Schema to safely preprocess and validate boolean values.
 * Converts string 'true'/'false' to boolean types.
 */
export const PreprocessedBooleanSchema = z.preprocess(
  (a) => (a === 'true' || a === true ? true : a === 'false' || a === false ? false : a),
  z.boolean(),
);

// UTILITY SCHEMAS (Search, Pagination, Maps)

/** * Schema for sorting direction (ascending or descending).
 */
export const SortDirectionSchema = z.enum(['asc', 'desc']).optional();

/** * Schema for database or API sort queries.
 */
export const SortQuerySchema = z.object({
  sortBy: z.string().optional(),
  sortDirection: SortDirectionSchema,
});

/** * Schema for filtering queries with logical operators.
 */
export const FilterQuerySchema = z.object({
  filters: z.string().optional(),
  logicalOperator: z.enum(['AND', 'OR']).optional(),
});

/**
 * Schema for pagination.
 * Pre-processes string numbers and defaults to ValidationSettings if not provided.
 */
export const PaginationSchema = z.object({
  page: z.preprocess(Number, z.number().min(1).default(ValidationSettings.DEFAULT_PAGE)).optional(),
  pageSize: z
    .preprocess(Number, z.number().min(1).default(ValidationSettings.DEFAULT_PAGE_SIZE))
    .optional(),
});
