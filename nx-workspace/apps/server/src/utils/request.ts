import { getRolesFromUser } from '../models/user-model';
import { Request, RequestAuth } from 'express';

export const isParamValueAllowed = <T>(allowedValues: T[], paramValue: T) => {
  return allowedValues.includes(paramValue);
};

export const createErrorParamField = <T>(message: string, validSortFields: T[]) => {
  return {
    message,
    validFields: validSortFields,
  };
};

/**
 * Useful to verify current user roles by similar level of access level. E.g. Verify if a user has any of the admin roles. [admin_0, admin_1].
 * Recommended use for middleware validations
 * @param req
 * @param rolesToBeVerified
 */
export const validateCurrentUserRolesWithSimilarLevel = async (
  req: Request,
  rolesToBeVerified: string[],
) => {
  const userId = (req as RequestAuth).templateNodeUser.id;
  const userRoles = await getRolesFromUser(userId);
  const userRoleIds = userRoles.map((role) => role.name);

  return userRoleIds.some((roleId) => {
    // Verify role by id
    return rolesToBeVerified.includes(roleId);
  });
};
