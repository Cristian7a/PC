import { z } from 'zod';

const contractRegex = /^PYC-\d{4}-(0[1-9]|1[0-2])-\d{4}$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

export const createReviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'validation.name_required' })
    .refine((val) => val.length === 0 || nameRegex.test(val), {
      message: 'validation.name_invalid',
    })
    .refine((val) => val.length === 0 || val.length >= 3, { message: 'validation.name_min' })
    .refine((val) => val.length <= 100, { message: 'validation.name_max' }),

  contract: z
    .string()
    .trim()
    .min(1, { message: 'validation.contract_required' })
    .refine((val) => val.length === 0 || contractRegex.test(val), {
      message: 'validation.contract_format',
    }),

  rating: z
    .number()
    .int()
    .min(1, { message: 'validation.rating_min' })
    .max(5, { message: 'validation.rating_max' }),

  category: z.string().min(1, { message: 'validation.category_required' }),

  services: z.array(z.string()).min(1, { message: 'validation.services_required' }),

  comment: z
    .string()
    .trim()
    .min(1, { message: 'validation.comment_required' })
    .refine((val) => val.length === 0 || val.length >= 10, { message: 'validation.comment_min' })
    .refine((val) => val.length <= 1000, { message: 'validation.comment_max' }),
});
