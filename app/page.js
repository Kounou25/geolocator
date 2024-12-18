'use client';

import { useState } from 'react';
import { SearchIcon, SunIcon, MoonIcon } from '@heroicons/react/outline';

export default function Home() {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Données fictives des appareils
  const devices = [
    { id: 1, name: 'Appareil A', status: 'En ligne', location: '12.9716° N, 77.5946° E' },
    { id: 2, name: 'Appareil B', status: 'Hors ligne', location: '13.0827° N, 80.2707° E' },
    { id: 3, name: 'Appareil C', status: 'En ligne', location: '28.7041° N, 77.1025° E' },
  ];

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/logo.png" alt="Mobigate" className="h-8" />
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
        {/* Search Bar */}
        <div className="flex mb-6 items-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Rechercher un appareil..."
              className="w-full p-4 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute top-3 right-4 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Device List */}
        <ul className="divide-y divide-gray-200">
          {filteredDevices.map((device) => (
            <li key={device.id} className="py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">{device.name}</h2>
                <p className="text-sm text-gray-500">{device.location}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  device.status === 'En ligne' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {device.status}
              </span>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className={`py-4 mt-auto text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <p>&copy; 2024 Mobigate. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
