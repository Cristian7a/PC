import { z } from 'zod';
import { contactFormSchema } from './contact.schema';

export type ContactFormDTO = z.infer<typeof contactFormSchema>;
