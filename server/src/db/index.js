import pg from 'pg';

const { Pool } = pg;

let pool;

export const getPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    pool.on('error', (err) => {
      console.error('Unexpected database error', err);
      process.exit(-1);
    });
  }
  return pool;
};