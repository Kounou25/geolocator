'use client';

import { useEffect, useState } from 'react';
import { LocationMarkerIcon, EyeIcon } from '@heroicons/react/outline';

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/devices'); // Assurez-vous que l'API est bien à ce chemin
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Device Logs</h1>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto p-4">
        {loading ? (
          <p className="text-center text-gray-600">Chargement des données...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log.id}
                className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-sm font-semibold text-gray-700">{log.message}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    ID: {log.deviceid} - <span>{log.createtime}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    IP: {log.ipaddress} - Gravité: {log.severity}
                  </p>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="bg-gray-200 text-gray-600 text-center py-4">
        &copy; 2024 Mobigate. Tous droits réservés.
      </footer>
    </div>
  );
}
