import { query } from '../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity') || 'VERBOSE';
    const deviceid = searchParams.get('deviceid') || 11;
    const messageFilter = searchParams.get('message') || '%GPS%';

    const result = await query(
      "SELECT * FROM plugin_devicelog_log WHERE severity=$1 AND message LIKE $2 AND deviceid=$3",
      [severity, messageFilter, deviceid]
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération' }),
      { status: 500 }
    );
  }
}
