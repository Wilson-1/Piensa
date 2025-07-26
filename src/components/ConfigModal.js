import React, { useState } from 'react';

const ConfigModal = ({ workTime, breakTime, onSave, onClose }) => {
  const [localWorkTime, setLocalWorkTime] = useState(workTime);
  const [localBreakTime, setLocalBreakTime] = useState(breakTime);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Configuración Pomodoro</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de trabajo (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={localWorkTime}
              onChange={(e) => setLocalWorkTime(parseInt(e.target.value) || 25)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de descanso (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={localBreakTime}
              onChange={(e) => setLocalBreakTime(parseInt(e.target.value) || 5)}
              className="w-full p-2 border border-gray-300 rounded"
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
            onClick={() => onSave(localWorkTime, localBreakTime)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;