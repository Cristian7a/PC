import { z } from 'zod';
import { CategorySchema } from './categories.schema';

export type CategoryDto = z.infer<typeof CategorySchema>;
