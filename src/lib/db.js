import { neon } from '@neondatabase/serverless';

let _sql;
export function sql() {
  if (!_sql) _sql = neon(import.meta.env.DATABASE_URL);
  return _sql;
}
