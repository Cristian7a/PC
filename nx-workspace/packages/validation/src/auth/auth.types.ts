import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.schema';

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
