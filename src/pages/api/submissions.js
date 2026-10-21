export const prerender = false;
import { query } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function GET({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const where = type ? 'WHERE type = $1' : '';
  const params = type ? [type] : [];
  const { rows } = await query(`SELECT * FROM submissions ${where} ORDER BY created_at DESC`, params);
  return json(rows);
}

export async function PUT({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id, read } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  await query('UPDATE submissions SET read = $1 WHERE id = $2', [read ?? true, id]);
  return json({ ok: true });
}

export async function DELETE({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  await query('DELETE FROM submissions WHERE id = $1', [id]);
  return json({ ok: true });
}
