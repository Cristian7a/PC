import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { DATABASE_URL } from './env.config.ts';

dotenv.config();

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('release', () => {
  console.log('Connection to the database released');
});

export { pool };
