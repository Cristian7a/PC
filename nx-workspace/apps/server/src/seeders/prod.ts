import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { pool } from '../db.ts';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } from '../env.config.ts';
import { AppSettings } from '../settings.ts';

const prod = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    const usersToCreate = [
      {
        name: 'admin nidiro',
        email: SUPER_ADMIN_EMAIL,
        password: SUPER_ADMIN_PASSWORD,
        refresh: crypto.randomBytes(32).toString('base64'),
      },
    ];

    // Insert users
    for (const user of usersToCreate) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Insert all users in a single query
    await client.query(
      `
        INSERT INTO users (name, email, password, refresh)
        VALUES
          ${usersToCreate.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ')}
          ON CONFLICT (email)
        DO NOTHING;
      `,
      usersToCreate.flatMap((user) => [user.name, user.email, user.password, user.refresh]),
    );

    // Insert into app_settings table
    await client.query(`
      INSERT INTO app_settings (key, value, description)
      VALUES ('SystemVersion', '1', NULL) ON CONFLICT (key) DO NOTHING;
    `);

    // Insert roles
    await client.query(`
      INSERT INTO roles (name, description)
      VALUES ('${AppSettings.ROLES.superAdmin}', 'Super admin (nidiro)'), -- Super admin (nidiro)
             ('${AppSettings.ROLES.admin}', 'Administrador'),             -- Admin (project owner)
             ('${AppSettings.ROLES.operator}', 'Operador')      -- Operator
        ON CONFLICT (name) DO NOTHING;
    `);

    // Insert users_roles
    const usersRolesToInsert = [{ email: SUPER_ADMIN_EMAIL, role: AppSettings.ROLES.superAdmin }];

    // Insert all users_roles in a single query
    await client.query(
      `
        INSERT INTO users_roles (user_id, role_id)
        SELECT users.id, roles.id
        FROM users,
             roles
        WHERE (users.email, roles.name) IN (${usersRolesToInsert.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(', ')})
          ON CONFLICT (user_id, role_id) DO NOTHING;
      `,
      usersRolesToInsert.flatMap((user) => [user.email, user.role]),
    );

    await client.query('COMMIT'); // Commit transaction
    console.log('Seeding completed.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during production seeding:', error);
  } finally {
    client.release();
    await pool.end(); // Close the pool after all operations are done
  }
};

prod().catch((err) => console.error(err));
