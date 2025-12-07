import { Router } from 'express';
import { login, refreshTokenController } from '../controllers/auth-controller';
import { validate } from '../middleware/validation';
import { loginSchema } from '@nx-workspace/validation';

const router = Router();

router.post('/login', validate({ body: loginSchema }), login);

router.post('/refresh', refreshTokenController);

export { router as authRouter };
