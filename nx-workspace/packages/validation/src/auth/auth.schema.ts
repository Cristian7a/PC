import { z } from 'zod';

// Regex patterns
const NUMBER_REGEX = /(?=.*[0-9])/;
const SPECIAL_CHAR_REGEX = /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;
const LOWERCASE_REGEX = /(?=.*[a-z])/;
const UPPERCASE_REGEX = /(?=.*[A-Z])/;

// Error messages
const INVALID_EMAIL_MSG = 'Invalid email address';
const PASSWORD_MIN_LENGTH_MSG = 'Password must be at least 8 characters';
const PASSWORD_NUMBER_MSG = 'Password must contain at least 1 number';
const PASSWORD_SPECIAL_CHAR_MSG = 'Password must contain at least 1 special character';
const PASSWORD_LOWERCASE_MSG = 'Password must contain at least 1 lowercase letter';
const PASSWORD_UPPERCASE_MSG = 'Password must contain at least 1 uppercase letter';
const NAME_REQUIRED_MSG = 'Name is required';

export const emailSchema = z.email(INVALID_EMAIL_MSG);
export const passwordSchema = z
  .string()
  .min(8, PASSWORD_MIN_LENGTH_MSG)
  .regex(NUMBER_REGEX, PASSWORD_NUMBER_MSG)
  .regex(SPECIAL_CHAR_REGEX, PASSWORD_SPECIAL_CHAR_MSG)
  .regex(LOWERCASE_REGEX, PASSWORD_LOWERCASE_MSG)
  .regex(UPPERCASE_REGEX, PASSWORD_UPPERCASE_MSG);

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Registration Schema
export const registerSchema = z.object({
  name: z.string().min(1, NAME_REQUIRED_MSG),
  email: emailSchema,
  password: passwordSchema,
});
