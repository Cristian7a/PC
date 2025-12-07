import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticate-jwt';
import { getUserProfileController } from '../controllers/user-controller';

const router = Router();

router.get('/profile', authenticateJWT, getUserProfileController);

export { router as userRouter };
