const COOKIE_NAME = 'essence_admin';

function encode(str) {
  return btoa(str);
}

function decode(str) {
  try { return atob(str); } catch { return ''; }
}

export function createSession() {
  const token = encode(JSON.stringify({ ts: Date.now(), v: 1 }));
  const secret = import.meta.env.ADMIN_PASSWORD || '';
  const sig = encode(secret + ':' + token);
  return `${token}.${sig}`;
}

export function verifySession(cookie) {
  if (!cookie) return false;
  const [token, sig] = cookie.split('.');
  if (!token || !sig) return false;
  const secret = import.meta.env.ADMIN_PASSWORD || '';
  const expected = encode(secret + ':' + token);
  if (sig !== expected) return false;
  try {
    const { ts } = JSON.parse(decode(token));
    return Date.now() - ts < 7 * 24 * 60 * 60 * 1000;
  } catch { return false; }
}

export function getSessionCookie(request) {
  const header = request.headers.get('cookie') || '';
  const match = header.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

export function setSessionHeader(value, maxAge = 7 * 24 * 60 * 60) {
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function isAdmin(request) {
  return verifySession(getSessionCookie(request));
}
