import env from 'dotenv';

env.config();

console.log("Running in environment:", process.env.ENVIRONMENT);

const isDevelopment = (process.env.ENVIRONMENT === 'development') || (process.env.ENVIRONMENT === 'migration');

export default {
  DB_HOST: isDevelopment ? 'viddle-db' : (process.env.DATABASE_HOST ?? ''),
  DB_PORT: isDevelopment
    ? 5432
    : parseInt(process.env.DATABASE_PORT ?? "0", 10),
  DB_NAME: 'postgres',
  DB_USERNAME: isDevelopment ? 'postgres' : (process.env.DATABASE_USERNAME ?? ''),
  DB_PASSWORD: isDevelopment ? 'postgres' : (process.env.DATABASE_PASSWORD ?? ''),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_EXPIRY_TIME: process.env.ACCESS_EXPIRY_TIME,
  REFRESH_EXPIRY_TIME: process.env.REFRESH_EXPIRY_TIME
}