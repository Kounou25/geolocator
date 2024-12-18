import { query } from '../../lib/db';

// Récupérer tous les items
export async function GET(request) {
  try {
    const result = await query("select * from plugin_devicelog_log where severity='VERBOSE' and message LIKE '%GPS%' ", []);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération' }), { status: 500 });
  }
}

