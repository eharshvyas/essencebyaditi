export const prerender = false;
import { sql } from '../../lib/db.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { type, ...fields } = data;
    if (!type || !['contact', 'newsletter'].includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (type === 'contact' && (!fields.name || !fields.email)) {
      return new Response(JSON.stringify({ error: 'Name and email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (type === 'newsletter' && !fields.email) {
      return new Response(JSON.stringify({ error: 'Email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const db = sql();
    const payload = JSON.stringify(fields);
    await db`INSERT INTO submissions (type, data) VALUES (${type}, ${payload})`;
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
