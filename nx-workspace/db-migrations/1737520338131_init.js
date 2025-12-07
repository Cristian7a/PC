/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

const appSettingsTableName = 'app_settings';
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable(appSettingsTableName, {
    key: { type: 'varchar(50)', notNull: true, primaryKey: true },
    value: { type: 'varchar(500)' },
    description: { type: 'varchar(500)' },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable(appSettingsTableName);
};
