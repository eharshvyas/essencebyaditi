export const prerender = false;
import { query } from '../../lib/db.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { email } = data;
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    await query(
      `INSERT INTO submissions (type, data) VALUES ('newsletter', $1)`,
      [JSON.stringify({ email })]
    );
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
