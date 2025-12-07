import { JwtPayload } from 'jsonwebtoken';
import { pool } from '../db';
import { PartialRecord } from '../types/partial-record';
import { AppSettings } from '../settings';
import { SortDirection } from '../types/sort-type';
import { IFilter } from '../interfaces/filter-interface';
import { LogicalOperator } from '../types/filter-type';
import { transformRequestFieldToDBField } from '../utils/object-property-and-db-field';
import { getWhereClauseFromFilters } from '../utils/filter';
import { PoolClient, QueryResult } from 'pg';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { ProblemError } from '../shared/errors/problem-error';

/**
 * The AppUserSafe interface is used to define the structure of the user object in the application.
 */
export interface AppUserDatabase {
  id: string;
  name: string;
  email: string;
  password: string;
  refresh: string;
  created_at: Date;
  updated_at: Date;
  reset_password_token: string;
  reset_password_token_created_at: Date;
}

/**
 * No password or other sensitive information should be included in this interface.
 * This type is used to receive and send user data in requests.
 */
export interface AppUser extends AppUserType {
  createdAt: Date;
  updatedAt: Date;
}

export type AppUserType = Omit<
  AppUserDatabase,
  | 'password'
  | 'refresh'
  | 'created_at'
  | 'updated_at'
  | 'reset_password_token'
  | 'reset_password_token_created_at'
> &
  RolesForUser;
export type AppUserDataForQuery = AppUserDatabase & RolesForUser;

export interface RolesForUser {
  roles: AppUserRole[];
}

// TODO: Verify if we can move it to another file.
export interface AppUserRole extends Omit<AppUserRoleDatabase, 'created_at' | 'updated_at'> {
  createdAt: Date;
  updatedAt: Date;
}

export interface AppUserRoleDatabase {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * The AppUserSafe interface is used to define the JWT token.
 * No password or other sensitive information should be included in this interface.
 */
export type AppUserSafe = Pick<AppUserDatabase, AppUserSafeProps>;
type AppUserSafeProps = 'id' | 'name' | 'email';

/**
 * These sort fields are related to {@link AppUser} and also should match with query fields and aliases.
 */
type UserSortField = 'u.name' | 'u.email' | 'u.createdAt' | 'u.updatedAt';
type UserFilterField = UserSortField;

/**
 * These filter fields are related to {@link AppUserRole} and also should match with query fields and aliases.
 */
type RoleFilterField = 'r.name' | 'r.createdAt' | 'r.updatedAt';
/**
 * Allow sort exclusively with {@link UserSortField} at the moment. With this we prevent unexpected results on total_count.
 * NOTE: If you want to add role sort fields, verify query results first.
 */
export type AppUserSortField = UserSortField;
/**
 * We define a proper object for filter fields.
 */
export type AppUserFilterField = UserFilterField | RoleFilterField;

export const validAppUserSortFields: AppUserSortField[] = [
  'u.name',
  'u.email',
  'u.createdAt',
  'u.updatedAt',
];
export const validAppUserFilterFields: AppUserFilterField[] = [
  'u.name',
  'u.email',
  'u.createdAt',
  'u.updatedAt',
  'r.name',
  'r.createdAt',
  'r.updatedAt',
];

/**
 * Map to "translate" properties that come from request data to database fields
 */
const userFieldsMap: PartialRecord<UserSortField | RoleFilterField, string> = {
  'u.createdAt': 'u.created_at',
  'u.updatedAt': 'u.updated_at',
  'r.createdAt': 'r.created_at',
  'r.updatedAt': 'r.updated_at',
};

/**
 * The user data obtained from the JWT token. Check {@link authenticateJWT} for more information.
 */
export type AppUserFromJWT = AppUserSafe & JwtPayload;

export const getUserRoles = async (userId: string) => {
  const result = await pool.query<{ role: string }>(
    `
      SELECT roles.name as role
      FROM roles
      JOIN users_roles ur ON roles.id = ur.role_id
      WHERE ur.user_id = $1
    `,
    [userId],
  );

  return result.rows.map((role) => role.role);
};

/* Unused
const getUserIdsWithRole = async (roleNames: string[]) => {
  const result = await pool.query<{user_id: number}>(
    `
      SELECT DISTINCT user_id
      FROM users_roles
      JOIN roles r ON users_roles.role_id = r.id
      WHERE r.name = ANY ($1::text[])
    `,
    [roleNames],
  );
  return result.rows.map((row) => row.user_id);
};
*/

export const getUsers = async (
  page = AppSettings.DEFAULT_PAGE,
  pageSize = AppSettings.DEFAULT_PAGE_SIZE,
  sortBy: AppUserSortField = 'u.createdAt',
  sortDirection: SortDirection = 'desc',
  filters?: IFilter<AppUserFilterField>[],
  logicalOperator: LogicalOperator = 'AND',
) => {
  const offset = (page - 1) * pageSize;
  const parsedSortBy = transformRequestFieldToDBField(sortBy, userFieldsMap);

  const result = await pool.query(
    `
      WITH filtered_users AS (
        SELECT DISTINCT ON (u.id, ${parsedSortBy}) 
          u.id,
          u.name,
          u.email,
          u.created_at,
          u.updated_at
        FROM users u
        LEFT JOIN users_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        ${filters ? getWhereClauseFromFilters(filters, logicalOperator, userFieldsMap) : ''}
        ORDER BY ${parsedSortBy} ${sortDirection}
      ),
      limited_users AS (
        SELECT * FROM filtered_users LIMIT ${pageSize} OFFSET ${offset}
      ),
      total_count AS (
        SELECT COUNT(*) AS total_count FROM filtered_users
      )
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        u.updated_at,
        r.id AS role_id,
        r.name AS role_name,
        r.created_at AS role_created_at,
        r.updated_at AS user_updated_at,
        total_count
      FROM total_count, limited_users u
      LEFT JOIN users_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      ORDER BY ${parsedSortBy} ${sortDirection}
    `,
  );

  const totalCount = +result.rows[0]?.total_count || 0;
  const userMap: Map<string, AppUser> = groupRolesByUsers(result);

  return {
    users: Array.from(userMap.values()),
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};

export const getAppUserDBBy = async (field: 'email' | 'id', value: string) => {
  const result = await pool.query<AppUserDatabase>(
    `
      SELECT *
      FROM users
      WHERE ${field} = $1
    `,
    [value],
  );
  return result.rows[0];
};

export const getUserById = async (userId: string) => {
  const result = await pool.query(
    `
      SELECT 
        u.id AS id,
        u.name AS name,
        u.email AS email,
        u.created_at AS created_at,
        u.updated_at AS updated_at,
        r.id AS role_id,
        r.name AS role_name,
        r.created_at AS role_created_at,
        r.updated_at AS user_updated_at
      FROM users u
      LEFT JOIN users_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.id = $1
    `,
    [userId],
  );

  const userMap: Map<string, AppUser> = groupRolesByUsers(result);
  return Array.from(userMap.values())?.[0];
};

export const createUser = async (userData: AppUserDataForQuery): Promise<AppUser> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insert the user
    const userResult = await client.query<AppUserDatabase>(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at, updated_at
      `,
      [userData.name, userData.email, hashedPassword],
    );

    const createdUser = userResult.rows[0];
    if (!createdUser) {
      throw new ProblemError({
        status: 500,
        title: 'User Creation Failed',
        detail: 'Failed to create user in database',
        type: 'internal-server-error',
      });
    }

    // We save wanted properties from createdUser to appUser
    const appUser: AppUser = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.created_at,
      updatedAt: createdUser.updated_at,
      roles: [],
    };

    const userRoles = userData.roles;
    if (userRoles?.length) {
      // Assign roles if provided
      const roleNames = userRoles.map((r) => r.name.toLowerCase());
      const rolesResult = await client.query<AppUserRole>(
        'SELECT id, name, created_at, updated_at FROM roles WHERE LOWER(name) = ANY($1::text[])',
        [roleNames],
      );

      const validRoles = rolesResult.rows;
      if (validRoles?.length) {
        // Insert user-role relationships
        const roleValues = validRoles.map((role) => `('${createdUser.id}', ${role.id})`).join(',');

        await client.query(
          `
            INSERT INTO users_roles (user_id, role_id)
            VALUES
            ${roleValues}
            ON CONFLICT (user_id, role_id) DO NOTHING
          `,
        );

        // Add roles to the return object
        appUser.roles = rolesResult.rows;
      }
    }

    await client.query('COMMIT');
    return appUser;
  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Error creating user:', error);
    throw new ProblemError({
      status: 500,
      title: 'User Creation Failed',
      detail: 'An unexpected error occurred while creating the user',
      type: 'internal-server-error',
    });
  } finally {
    client.release();
  }
};

/**
 * Updates a user and their roles
 * @param userId - The ID of the user to update
 * @param userData - The user data to update (partial)
 * @returns The updated user with their roles
 */
export const updateUser = async (
  userId: string,
  userData: Partial<AppUserDataForQuery>,
): Promise<AppUser | null> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const valuesToBeUpdated = [userId, userData.name, userData.email];
    let passwordStringQuery = '';
    if (userData.password) {
      valuesToBeUpdated.push(await bcrypt.hash(userData.password, 10));
      valuesToBeUpdated.push(crypto.randomBytes(32).toString('base64'));
      passwordStringQuery = `, password = $4, refresh = $5`;
    }

    const result = await client.query<AppUserDatabase>(
      `
        UPDATE users
        SET 
          name = $2,
          email = $3,
          updated_at = CURRENT_TIMESTAMP ${passwordStringQuery}
        WHERE id = $1
        RETURNING 
          id,
          name,
          email,
          created_at,
          updated_at
      `,
      valuesToBeUpdated,
    );
    const updatedUser = result.rows[0];

    if (!updatedUser) {
      await client.query('ROLLBACK');
      return null;
    }

    // First, delete all existing roles for the user to be able to update user roles
    await client.query('DELETE FROM users_roles WHERE user_id = $1', [userId]);

    // Get role IDs for the provided role names
    const roleNames = userData.roles?.map((r) => r.name.toLowerCase()) || [];
    const roles = await insertUserRolesUsingTransaction(client, roleNames, updatedUser);

    await client.query('COMMIT');
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
      roles,
    };
  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Error updating user:', error);
    throw new ProblemError({
      status: 500,
      title: 'User Update Failed',
      detail: 'An unexpected error occurred while updating the user',
      type: 'internal-server-error',
    });
  } finally {
    client.release();
  }
};

export const deleteUser = async (userId: string) => {
  try {
    // Remove roles before removing user
    await pool.query(
      `
        DELETE
        FROM users_roles
        WHERE user_id = $1
      `,
      [userId],
    );
    const result = await pool.query(
      `
        DELETE
        FROM users
        WHERE id = $1
        RETURNING *
      `,
      [userId],
    );

    if (!result.rows[0]) {
      throw new ProblemError({
        status: 404,
        title: 'User Not Found',
        detail: `User with ID ${userId} was not found`,
        type: 'user-not-found',
      });
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new ProblemError({
      status: 500,
      title: 'User Deletion Failed',
      detail: 'An unexpected error occurred while deleting the user',
      type: 'internal-server-error',
    });
  }
};

export const getRolesFromUser = async (userId: string) => {
  const result = await pool.query<AppUserRoleDatabase>(
    `
      SELECT 
        r.id, 
        r.name, 
        r.created_at, 
        r.updated_at 
      FROM users_roles ur 
      INNER JOIN roles r ON ur.role_id = r.id 
      WHERE user_id = $1
    `,
    [userId],
  );
  return parseDBRolesToRoles(result.rows) || [];
};

export const checkUserHasRole = async (userId: string, roleId: number) => {
  const result = await pool.query(
    `
      SELECT ur.role_id 
      FROM users_roles ur 
      INNER JOIN roles r ON ur.role_id = r.id 
      WHERE role_id = $1 
      AND ur.user_id = $2
    `,
    [roleId, userId],
  );
  return !!result.rows[0];
};

export const addRoleToUser = async (userId: string, roleId: number) => {
  try {
    const isRoleAssigned = await checkUserHasRole(userId, roleId);
    if (isRoleAssigned) {
      return;
    }

    const result = await pool.query(
      `
        INSERT INTO users_roles (user_id, role_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, role_id) DO NOTHING
      `,
      [userId, roleId],
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw new ProblemError({
      status: 500,
      title: 'Role Assignment Failed',
      detail: 'An unexpected error occurred while assigning role to user',
      type: 'internal-server-error',
    });
  }
};

export const removeRoleFromUser = async (userId: string, roleId: number) => {
  try {
    const result = await pool.query(
      `
        DELETE
        FROM users_roles
        WHERE user_id = $1
        AND role_id = $2
      `,
      [userId, roleId],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error removing role from user:', error);
    throw new ProblemError({
      status: 500,
      title: 'Role Removal Failed',
      detail: 'An unexpected error occurred while removing role from user',
      type: 'internal-server-error',
    });
  }
};

export const setResetPasswordToken = async (userId: string, resetPasswordToken: string) => {
  try {
    const resetPasswordTokenCreatedAt = new Date().toISOString();
    const result = await pool.query(
      `
        UPDATE users
        SET 
          reset_password_token = $1,
          reset_password_token_created_at = $2
        WHERE id = $3
        RETURNING *;
      `,
      [resetPasswordToken, resetPasswordTokenCreatedAt, userId],
    );

    if (!result.rows[0]) {
      throw new ProblemError({
        status: 404,
        title: 'User Not Found',
        detail: `User with ID ${userId} was not found`,
        type: 'user-not-found',
      });
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error setting reset password token:', error);
    throw new ProblemError({
      status: 500,
      title: 'Reset Token Creation Failed',
      detail: 'An unexpected error occurred while setting reset password token',
      type: 'internal-server-error',
    });
  }
};

export const isValidResetUserPasswordToken = async (token: string) => {
  try {
    const result = await pool.query(
      `
        SELECT id
        FROM users
        WHERE reset_password_token = $1
        AND reset_password_token_created_at > CURRENT_TIMESTAMP - INTERVAL '1 hours';
      `,
      [token],
    );
    return !!result.rows[0];
  } catch (error) {
    console.error('Error validating reset password token:', error);
    throw new ProblemError({
      status: 500,
      title: 'Token Validation Failed',
      detail: 'An unexpected error occurred while validating reset password token',
      type: 'internal-server-error',
    });
  }
};

export const resetUserPassword = async (token: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `
        UPDATE users
        SET 
          password = $1,
          reset_password_token = NULL,
          reset_password_token_created_at = NULL
        WHERE reset_password_token = $2
        RETURNING *;
      `,
      [hashedPassword, token],
    );

    if (!result.rows[0]) {
      throw new ProblemError({
        status: 400,
        title: 'Invalid Reset Token',
        detail: 'The provided reset token is invalid or has expired',
        type: 'invalid-reset-token',
      });
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error resetting user password:', error);
    throw new ProblemError({
      status: 500,
      title: 'Password Reset Failed',
      detail: 'An unexpected error occurred while resetting password',
      type: 'internal-server-error',
    });
  }
};

/**
 * Build and return a Map using id as key and {@link AppUser} as value.
 * @param result
 */
const groupRolesByUsers = (result: QueryResult) => {
  // Group roles by user
  const userMap = new Map<string, AppUser>();
  for (const row of result.rows) {
    const userId = row.id;
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        id: userId,
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        roles: [],
      });
    }

    if (row.role_id) {
      userMap.get(userId)?.roles.push({
        id: row.role_id,
        name: row.role_name,
        createdAt: row.role_created_at,
        updatedAt: row.role_updated_at,
      });
    }
  }

  return userMap;
};

const parseDBRolesToRoles = (roles: AppUserRoleDatabase[]): AppUserRole[] => {
  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    createdAt: role.created_at,
    updatedAt: role.updated_at,
  }));
};

const insertUserRolesUsingTransaction = async (
  client: PoolClient,
  roleNames: string[],
  user: AppUserDatabase,
) => {
  if (!roleNames.length) {
    return [];
  }
  const rolesResult = await client.query<AppUserRole>(
    'SELECT id, name, created_at, updated_at FROM roles WHERE LOWER(name) = ANY($1::text[])',
    [roleNames],
  );

  const validRoles = rolesResult.rows || [];
  if (validRoles?.length) {
    // Insert user-role relationships
    const roleValues = validRoles.map((role) => `('${user.id}', ${role.id})`).join(',');

    await client.query(
      `
        INSERT INTO users_roles (user_id, role_id)
        VALUES
        ${roleValues}
        ON CONFLICT (user_id, role_id) DO NOTHING
      `,
    );
  }
  return validRoles;
};
