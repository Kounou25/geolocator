import { Pool } from 'pg';

const pool = new Pool({
  user: 'root', // Votre utilisateur PostgreSQL
  host: '147.79.115.154', // L'hôte de votre serveur PostgreSQL
  database: 'hmdm', // Le nom de votre base de données
  password: '**##89517628@@KingKong', // Laissez vide si votre base de données n'a pas de mot de passe
  port: 5432, // Port par défaut de PostgreSQL
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}
