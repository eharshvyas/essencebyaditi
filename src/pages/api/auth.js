export const prerender = false;
import { createSession, setSessionHeader } from '../../lib/auth.js';

export async function POST({ request }) {
  const { password } = await request.json();
  const expected = import.meta.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    return new Response(JSON.stringify({ error: 'Wrong password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const session = createSession();
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': setSessionHeader(session),
    },
  });
}
