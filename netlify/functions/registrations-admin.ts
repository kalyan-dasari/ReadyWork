import { neon } from '@neondatabase/serverless';

const jsonResponse = (
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = {}
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });

const unauthorized = () =>
  jsonResponse(
    { error: 'Authentication required.' },
    401,
    { 'www-authenticate': 'Basic realm="Student registrations"' }
  );

const isAuthorized = (request: Request): boolean => {
  const authorization = request.headers.get('authorization');
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!authorization?.startsWith('Basic ') || !username || !password) return false;

  try {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(':');
    return separator >= 0 && decoded.slice(0, separator) === username && decoded.slice(separator + 1) === password;
  } catch {
    return false;
  }
};

export default async (request: Request) => {
  if (!process.env.DATABASE_URL) {
    return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
  }

  if (!isAuthorized(request)) return unauthorized();
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed.' }, 405);

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT id, submitted_at, form_data
      FROM registrations
      ORDER BY submitted_at DESC
      LIMIT 500
    `;

    return jsonResponse({ registrations: rows });
  } catch (error) {
    console.error('Admin registrations API error', error);
    return jsonResponse({ error: 'Unable to load registrations.' }, 500);
  }
};
