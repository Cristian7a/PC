import { z } from 'zod';
import { createReviewSchema } from './reviews.schema';

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
