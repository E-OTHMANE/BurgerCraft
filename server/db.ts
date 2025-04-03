import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
const { Pool } = pg;
import * as schema from '@shared/schema';
import { log } from './vite';

// Configure PostgreSQL connection pool with more resilient settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000, // How long to wait for a connection to become available
  maxUses: 7500, // Number of times a client can be used before it's recycled
});

// Add error handler for the pool
pool.on('error', (err) => {
  log(`Unexpected PostgreSQL pool error: ${err.message}`, 'postgres');
  // Don't crash on connection errors, just log them
});

// Test the connection
async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    log('Successfully connected to PostgreSQL database', 'postgres');
    return true;
  } catch (err) {
    log(`Error connecting to PostgreSQL database: ${(err as Error).message}`, 'postgres');
    return false;
  } finally {
    if (client) client.release();
  }
}

// Perform initial connection test without crashing on failure
testConnection();

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