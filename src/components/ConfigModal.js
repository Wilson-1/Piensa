import React, { useState, useEffect } from 'react';

const ConfigModal = ({ workTime = 25, onSave, onClose }) => {
  const [localWorkTime, setLocalWorkTime] = useState(workTime);

  // Calcula descanso como 20% del trabajo, mínimo 1 min
  const calculatedBreakTime = Math.max(1, Math.round(localWorkTime * 0.2));

  // Asegura que el trabajo no sea menor a 25
  useEffect(() => {
    if (localWorkTime < 25) {
      setLocalWorkTime(25);
    }
  }, [localWorkTime]);

  const handleWorkTimeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 25) {
      setLocalWorkTime(value);
    } else if (isNaN(value)) {
      // si borran el input, poner mínimo 25 para evitar vacío
      setLocalWorkTime(25);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Configuración Pomodoro</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de trabajo (minutos) - mínimo 25
            </label>
            <input
              type="number"
              min="25"
              value={localWorkTime}
              onChange={handleWorkTimeChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo de descanso (20% calculado automáticamente)
            </label>
            <input
              type="number"
              value={calculatedBreakTime}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
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
            onClick={() => onSave(localWorkTime, calculatedBreakTime)}
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
