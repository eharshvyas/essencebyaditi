import { neon } from '@neondatabase/serverless';

let _sql;
export function getDb() {
  if (!_sql) _sql = neon(import.meta.env.DATABASE_URL);
  return _sql;
}

export async function query(text, params = []) {
  const db = getDb();
  return db.query(text, params);
}
