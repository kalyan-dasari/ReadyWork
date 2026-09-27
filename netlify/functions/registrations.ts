import { neon } from '@neondatabase/serverless';
import type { NeonQueryFunction } from '@neondatabase/serverless';

const BASE_INTEREST_COUNT = 1284;

interface RegistrationPayload {
  deviceId?: string;
  formData?: Record<string, unknown>;
}

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const getCount = async (sql: NeonQueryFunction<false, false>) => {
  const rows = await sql`SELECT COUNT(*)::int AS count FROM registrations`;
  return BASE_INTEREST_COUNT + Number(rows[0]?.count || 0);
};

export default async (request: Request) => {
  if (!process.env.DATABASE_URL) {
    return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (request.method === 'GET') {
      return jsonResponse({ count: await getCount(sql) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed.' }, 405);
    }

    const { deviceId, formData } = (await request.json()) as RegistrationPayload;
    if (!deviceId || !formData) {
      return jsonResponse({ error: 'Registration data is incomplete.' }, 400);
    }

    const existing = await sql`
      SELECT id, submitted_at, form_data
      FROM registrations
      WHERE device_id = ${deviceId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return jsonResponse({
        record: {
          ...existing[0].form_data,
          id: existing[0].id,
          submittedAt: existing[0].submitted_at,
        },
        count: await getCount(sql),
      });
    }

    const id = crypto.randomUUID();
    const submittedAt = new Date().toISOString();

    await sql`
      INSERT INTO registrations (id, device_id, submitted_at, form_data)
      VALUES (${id}, ${deviceId}, ${submittedAt}, ${JSON.stringify(formData)}::jsonb)
    `;

    return jsonResponse({
      record: { ...formData, id, submittedAt },
      count: await getCount(sql),
    });
  } catch (error) {
    console.error('Registration API error', error);
    return jsonResponse({ error: 'Unable to save registration.' }, 500);
  }
};
