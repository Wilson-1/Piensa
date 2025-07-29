import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = ({ 
  workTime = 25, 
  breakTime = 5, 
  onComplete, 
  onConfigClick,
  onConnectBluetooth 
}) => {
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

  const alarmSound = useRef(new Audio('/alarma.mp3'));

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isAlarmPlaying) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
      setIsAlarmPlaying(false);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'work' ? workTime : breakTime);
    setSeconds(0);
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setIsAlarmPlaying(false);
  };

  useEffect(() => {
    setMinutes(workTime);
    setSeconds(0);
  }, [workTime]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            setMinutes(nextMode === 'work' ? workTime : breakTime);
            setSeconds(0);

            alarmSound.current.play();
            setIsAlarmPlaying(true);

            if (nextMode === 'work') {
              setCompletedPomodoros(prev => prev + 1);
              onComplete?.();
            }
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prev => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, workTime, breakTime]);

  const totalSeconds = mode === 'work' ? workTime * 60 : breakTime * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const progressPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {isAlarmPlaying && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center">
          <span className="mr-2">🔔 {mode === 'work' ? '¡Tiempo de descanso!' : '¡Volver al trabajo!'}</span>
          <button 
            onClick={() => {
              alarmSound.current.pause();
              alarmSound.current.currentTime = 0;
              setIsAlarmPlaying(false);
            }}
            className="ml-auto text-sm bg-red-200 px-2 py-1 rounded"
          >
            Silenciar
          </button>
        </div>
      )}

      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progressPercentage / 100)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold">
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </div>
          <div className="text-lg font-medium mt-2 text-red-600">
            {mode === 'work' ? 'Trabajo' : 'Descanso'}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-full text-white font-medium ${isActive ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'} transition-colors shadow-md`}
        >
          {isActive ? 'Detener' : 'Comenzar'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-200 rounded-full font-medium hover:bg-gray-300 transition-colors shadow-md"
        >
          Reiniciar
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button 
          onClick={onConfigClick}
          className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          ⚙️ Configurar
        </button>
        <button 
          onClick={onConnectBluetooth}
          className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          🔌 Conectar Bluetooth
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">Pomodoros completados</p>
        <p className="text-2xl font-bold text-red-600">{completedPomodoros}</p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
