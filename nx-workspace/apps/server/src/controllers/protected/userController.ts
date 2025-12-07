import { Request, RequestAuth, Response } from 'express';
import { getUserRoles } from '../../models/user-model';

export const getWhoAmIController = (req: Request, res: Response) => {
  res.json({ email: (req as RequestAuth).templateNodeUser.email });
};

export const getCurrentUserRolesController = async (req: Request, res: Response) => {
  const currentUser = (req as RequestAuth).templateNodeUser;
  res.json({ roles: await getUserRoles(currentUser.id) });
};

// export const setUserRoleController = async (req: Request, res: Response) => {
//   // TODO Enrique: Add permissions middleware!!
//
//   const currentUser = (req as RequestAuth).templateNodeUser;
//   const userId = +req.params.user_id;
//   const role = req.body.role;
//
//   if (currentUser.id === userId) {
//     res.status(403).json({message: 'You cannot change your own role'});
//     return;
//   }
//
//   if (!role) {
//     res.status(400).json({message: 'Role is required'});
//     return;
//   }
//   // Update user role
//   try {
//     const ok = await updateUserRole(userId, role);
//     if (ok) {
//       res.status(201).json({message: `User ${userId} role updated`});
//     } else {
//       res.status(400).json({message: `Failed to update user ${userId} role`});
//     }
//   } catch (error) {
//     res.status(400).json({message: `Error updating user ${userId} role`});
//     // TODO Enrique: Log error
//   }
// };
