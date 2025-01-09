'use client';

import { useState, useEffect } from 'react';
import {
  SearchIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon,
  MapIcon,
} from '@heroicons/react/outline';

export default function Home() {
  const [filterLimit, setFilterLimit] = useState(10); // Limite par défaut des informations à afficher
  const [darkMode, setDarkMode] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceId, setDeviceId] = useState(null); // Variable d'état pour le deviceId

  // Fonction pour extraire latitude et longitude depuis le message
  function parseCoordinates(message) {
    const regex = /lat=([+-]?\d+\.\d+),\s*lon=([+-]?\d+\.\d+)/;
    const match = message.match(regex);

    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    }
    return { latitude: null, longitude: null };
  }

  // Fetch data from the API
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deviceIdFromUrl = urlParams.get('deviceid');
    setDeviceId(deviceIdFromUrl);
  }, []);

  useEffect(() => {
    if (deviceId === null) {
      return;
    }

    async function fetchDevices() {
      try {
        const response = await fetch(`/api/devices/getby?deviceid=${deviceId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des appareils.');
        }
        const data = await response.json();
        setDevices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, [deviceId]);

  const limitedDevices = devices.slice(0, filterLimit); // Limiter les appareils selon la valeur du filtre

  const handleDeviceClick = async (latitude, longitude) => {
    const url = `https://www.google.com/maps/place/${latitude}+${longitude}/`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/favicon.ico" alt="Mobigate Geolocator" className="h-8" />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex-grow">
        {/* Filter Bar */}
        <div className="flex mb-6 items-center justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="number"
              min="1"
              max="100"
              placeholder="Limite d'informations à afficher..."
              className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-white focus:ring-yellow-500'
                  : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
              }`}
              value={filterLimit}
              onChange={(e) => setFilterLimit(Number(e.target.value))}
            />
            <SearchIcon
              className={`absolute top-3 right-4 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Device List */}
        {loading ? (
          <p className="text-center text-gray-500">Chargement des appareils...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-3">
            {limitedDevices.map((device) => {
              const { latitude, longitude } = parseCoordinates(device.message);

              return (
                <li
                  key={device.number}
                  className={`flex items-center justify-between p-3 rounded-lg shadow-sm border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } hover:bg-gray-100 hover:shadow-md transition-all`}
                  onClick={() => handleDeviceClick(latitude, longitude)}
                >
                  <div className="flex items-center space-x-4">
                    <MapIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <h2 className="text-xm font-medium">{device.number}</h2>
                      <p className="text-sm text-gray-700">{device.message}</p>
                      <p className="text-xs text-gray-500">
                        Latitude: {latitude !== null ? latitude : 'Non disponible'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Longitude: {longitude !== null ? longitude : 'Non disponible'}
                      </p>
                      <p className="text-xs text-gray-500">ip: {device.ipaddress}</p>
                      <p className="text-xs text-gray-500">
                        identifiant: {device.deviceid}
                      </p>
                      <p className="text-xs text-gray-500">
                        {device.createtime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        device.severity === 'VERBOSE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {device.severity}
                    </span>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`py-4 mt-auto text-center text-sm ${
          darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}
      >
        <p>&copy; 2024 Mobigate. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
