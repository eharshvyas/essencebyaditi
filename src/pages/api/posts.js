export const prerender = false;
import { sql } from '../../lib/db.js';
import { isAdmin } from '../../lib/auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export async function GET({ request }) {
  const url = new URL(request.url);
  const all = url.searchParams.get('all') === '1';
  const slug = url.searchParams.get('slug');
  const db = sql();

  if (slug) {
    const rows = await db`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
    if (!rows.length) return json({ error: 'Not found' }, 404);
    const post = rows[0];
    post.body = JSON.parse(post.body);
    return json(post);
  }

  const rows = all && isAdmin(request)
    ? await db`SELECT * FROM posts ORDER BY created_at DESC`
    : await db`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
  rows.forEach(r => { r.body = JSON.parse(r.body); });
  return json(rows);
}

export async function POST({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const data = await request.json();
  const { slug, title, excerpt = '', category = '', read_time = '5 min read', image = '', body = [], published = false } = data;
  if (!slug || !title) return json({ error: 'slug and title required' }, 400);
  const bodyStr = JSON.stringify(body);
  const db = sql();
  const rows = await db`INSERT INTO posts (slug, title, excerpt, category, read_time, image, body, published)
    VALUES (${slug}, ${title}, ${excerpt}, ${category}, ${read_time}, ${image}, ${bodyStr}, ${published}) RETURNING *`;
  rows[0].body = JSON.parse(rows[0].body);
  return json(rows[0], 201);
}

export async function PUT({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const data = await request.json();
  const { id, slug, title, excerpt = '', category = '', read_time = '5 min read', image = '', body = [], published = false } = data;
  if (!id) return json({ error: 'id required' }, 400);
  const bodyStr = JSON.stringify(body);
  const db = sql();
  const rows = await db`UPDATE posts SET slug=${slug}, title=${title}, excerpt=${excerpt}, category=${category},
    read_time=${read_time}, image=${image}, body=${bodyStr}, published=${published}, updated_at=NOW()
    WHERE id=${id} RETURNING *`;
  if (!rows.length) return json({ error: 'Not found' }, 404);
  rows[0].body = JSON.parse(rows[0].body);
  return json(rows[0]);
}

export async function DELETE({ request }) {
  if (!isAdmin(request)) return json({ error: 'Unauthorized' }, 401);
  const { id } = await request.json();
  if (!id) return json({ error: 'id required' }, 400);
  const db = sql();
  await db`DELETE FROM posts WHERE id = ${id}`;
  return json({ ok: true });
}
