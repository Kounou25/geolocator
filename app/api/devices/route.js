import { query } from '../../lib/db';

// Récupérer tous les items
export async function GET(request) {
  try {
    const result = await query("SELECT DISTINCT ON (dev.number) log.id, dev.number, log.deviceid, log.ipaddress, log.severity, log.message, to_timestamp(log.createtime / 1000) AS createtime FROM plugin_devicelog_log log JOIN devices dev ON log.deviceid = dev.id WHERE log.severity = 'VERBOSE' AND log.message LIKE '%GPS%' ORDER BY dev.number, log.createtime DESC ", []);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération' }), { status: 500 });
  }
}

