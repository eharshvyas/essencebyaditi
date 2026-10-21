export const prerender = false;
import { query } from '../../lib/db.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { name, email, phone, concern, preferred_date, message } = data;
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    await query(
      `INSERT INTO submissions (type, data) VALUES ('contact', $1)`,
      [JSON.stringify({ name, email, phone, concern, preferred_date, message })]
    );
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
