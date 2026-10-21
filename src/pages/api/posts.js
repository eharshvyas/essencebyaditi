export const prerender = false;
import { query } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function GET({ request }) {
  const url = new URL(request.url);
  const all = url.searchParams.get('all') === '1';
  const slug = url.searchParams.get('slug');

  if (slug) {
    const { rows } = await query('SELECT * FROM posts WHERE slug = $1 LIMIT 1', [slug]);
    if (!rows.length) return json({ error: 'Not found' }, 404);
    const post = rows[0];
    post.body = JSON.parse(post.body);
    return json(post);
  }

  const where = all && isAdmin(request) ? '' : 'WHERE published = true';
  const { rows } = await query(`SELECT * FROM posts ${where} ORDER BY created_at DESC`);
  rows.forEach(r => { r.body = JSON.parse(r.body); });
  return json(rows);
}

export async function POST({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const data = await request.json();
  const { slug, title, excerpt, category, read_time, image, body, published } = data;
  if (!slug || !title) return json({ error: 'slug and title required' }, 400);
  const { rows } = await query(
    `INSERT INTO posts (slug, title, excerpt, category, read_time, image, body, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [slug, title, excerpt || '', category || '', read_time || '5 min read', image || '', JSON.stringify(body || []), published ?? false]
  );
  rows[0].body = JSON.parse(rows[0].body);
  return json(rows[0], 201);
}

export async function PUT({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const data = await request.json();
  const { id, slug, title, excerpt, category, read_time, image, body, published } = data;
  if (!id) return json({ error: 'id required' }, 400);
  const { rows } = await query(
    `UPDATE posts SET slug=$1, title=$2, excerpt=$3, category=$4, read_time=$5, image=$6, body=$7, published=$8, updated_at=NOW()
     WHERE id=$9 RETURNING *`,
    [slug, title, excerpt || '', category || '', read_time || '5 min read', image || '', JSON.stringify(body || []), published ?? false, id]
  );
  if (!rows.length) return json({ error: 'Not found' }, 404);
  rows[0].body = JSON.parse(rows[0].body);
  return json(rows[0]);
}

export async function DELETE({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  await query('DELETE FROM posts WHERE id = $1', [id]);
  return json({ ok: true });
}
