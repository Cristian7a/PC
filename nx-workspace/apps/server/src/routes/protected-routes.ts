import { Router } from 'express';
import {
  getCurrentUserRolesController,
  getWhoAmIController,
} from '../controllers/protected/userController';
import { register } from '../controllers/auth-controller';

import { validate } from '../middleware/validation';
import { registerSchema } from '@nx-workspace/validation';

const router = Router();

// POST Register
// {{apiHost}}/api/v1/a/register
router.post('/register', validate({ body: registerSchema }), register);

// GET whoami
// {{apiHost}}/api/v1/a/whoami
router.get('/whoami', getWhoAmIController);

// GET Get User Role
// {{apiHost}}/api/v1/a/whoami/role
router.get('/whoami/roles', getCurrentUserRolesController);

// PUT Update User Role
// {{apiHost}}/api/v1/a/users/{{user_id}}/role
// router.put('/users/:user_id/role', setUserRoleController); // TODO Enrique: Add middleware to check if the caller is an admin

export { router as protectedRoutes };
