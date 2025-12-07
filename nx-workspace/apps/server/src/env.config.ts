import * as dotenv from 'dotenv';

dotenv.config();

type ProjectEnvVariables =
  | 'IS_PRODUCTION'
  | 'PORT'
  | 'DATABASE_URL'
  | 'CORS_ORIGIN'
  | 'JWT_SECRET'
  | 'ENABLE_JWT_DEBUG'
  | 'SUPER_ADMIN_PASSWORD'
  | 'SUPER_ADMIN_EMAIL';

const requiredEnvVariables: ProjectEnvVariables[] = [
  'IS_PRODUCTION',
  'PORT',
  'DATABASE_URL',
  'CORS_ORIGIN',
  'JWT_SECRET',
  'ENABLE_JWT_DEBUG',
  'SUPER_ADMIN_PASSWORD',
  'SUPER_ADMIN_EMAIL',
];

type IEnvConfigVariables = {
  [key in ProjectEnvVariables]: string;
};

const processEnv = process.env;

const getEnvValuesOrFail = () => {
  const envValues = {} as IEnvConfigVariables;
  requiredEnvVariables.forEach((varName) => {
    const value = processEnv[varName];
    if (value === undefined || value === '') {
      throw new Error(`Environment variable ${varName} is required but was not defined.`);
    }
    envValues[varName] = value;
  });
  return envValues;
};

/**
 * Use these variables instead of reading process.env directly, this way is more performant.
 */
export const {
  IS_PRODUCTION,
  PORT,
  DATABASE_URL,
  CORS_ORIGIN,
  JWT_SECRET,
  ENABLE_JWT_DEBUG,
  SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_EMAIL,
} = getEnvValuesOrFail();
