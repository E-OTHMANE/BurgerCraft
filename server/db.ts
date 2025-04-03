import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
const { Pool } = pg;
import * as schema from '@shared/schema';
import { log } from './vite';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect()
  .then(() => log('Successfully connected to PostgreSQL database', 'postgres'))
  .catch(err => {
    log(`Error connecting to PostgreSQL database: ${err.message}`, 'postgres');
    process.exit(1);
  });

// Create Drizzle ORM instance with our schema
export const db = drizzle(pool, { schema });

// Function to run migrations (called at app startup)
export async function runMigrations() {
  try {
    log('Running database migrations...', 'postgres');
    await migrate(db, { migrationsFolder: './migrations' });
    log('Database migrations completed successfully', 'postgres');
  } catch (error) {
    log(`Migration error: ${(error as Error).message}`, 'postgres');
    throw error;
  }
}