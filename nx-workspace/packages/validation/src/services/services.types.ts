import { z } from 'zod';
import { ServiceSchema } from './services.schema';

export type ServiceDto = z.infer<typeof ServiceSchema>;
