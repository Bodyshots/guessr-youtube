import env from 'dotenv';

env.config();

console.log("Running in environment:", process.env.ENVIRONMENT);

const isDevelopment = process.env.ENVIRONMENT === 'development';

export default {
  DB_HOST: isDevelopment ? 'viddle-db' : (process.env.DATABASE_HOST ?? ''),
  DB_PORT: isDevelopment
    ? 5432
    : parseInt(process.env.DATABASE_PORT ?? "0", 10),
  DB_NAME: 'postgres',
  DB_USERNAME: isDevelopment ? 'postgres' : (process.env.DATABASE_USERNAME ?? ''),
  DB_PASSWORD: isDevelopment ? 'postgres' : (process.env.DATABASE_PASSWORD ?? '')
}