import React, { useState } from 'react';

const ESP32Modal = ({ onClose, onConnect }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Conectar ESP32</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SSID (Nombre de red)
            </label>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nombre de tu WiFi"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Contraseña de tu WiFi"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConnect(ssid, password)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Conectar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESP32Modal;

// DONE