export const prerender = false;
import { sql } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function GET({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const db = sql();
  const rows = type
    ? await db`SELECT * FROM submissions WHERE type = ${type} ORDER BY created_at DESC`
    : await db`SELECT * FROM submissions ORDER BY created_at DESC`;
  return json(rows);
}

export async function PUT({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id, read = true } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  const db = sql();
  await db`UPDATE submissions SET read = ${read} WHERE id = ${id}`;
  return json({ ok: true });
}

export async function DELETE({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  const db = sql();
  await db`DELETE FROM submissions WHERE id = ${id}`;
  return json({ ok: true });
}
