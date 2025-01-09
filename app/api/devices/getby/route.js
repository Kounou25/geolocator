import { query } from '../../../lib/db';

// Récupérer tous les items, avec un filtrage basé sur le deviceid
export async function GET(request) {
  try {
    // Extraire le deviceid des paramètres de l'URL
    const url = new URL(request.url);
    const deviceId = url.searchParams.get('deviceid'); // Récupérer le deviceid du paramètre GET

    if (!deviceId) {
      return new Response(JSON.stringify({ error: 'deviceid est requis.' }), { status: 400 });
    }

    // Requête SQL avec filtrage sur deviceid
    const result = await query(
      `SELECT  log.id, dev.number, log.deviceid, log.ipaddress, log.severity, log.message, 
          to_timestamp(log.createtime / 1000) AS createtime 
       FROM plugin_devicelog_log log 
       JOIN devices dev ON log.deviceid = dev.id 
       WHERE log.severity = 'VERBOSE' 
         AND log.message LIKE '%GPS%' 
         AND log.deviceid = $1 
       ORDER BY dev.number, log.createtime DESC 
       LIMIT 10`, // Limitation à 10 enregistrements
      [deviceId] // Utilisation du deviceid dans la requête
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération' }), { status: 500 });
  }
}
