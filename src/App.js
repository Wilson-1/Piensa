import React, { useState, useEffect } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import PomodoroInfo from './components/PomodoroInfo';
import LoadingScreen from './components/LoadingScreen';
import StatsScreen from './components/StatsScreen';
import ConfigModal from './components/ConfigModal';
import BluetoothModal from './components/BluetoothModal';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('timer');
  const [showConfig, setShowConfig] = useState(false);
  const [showBluetooth, setShowBluetooth] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [stats, setStats] = useState({
    pomodorosCompleted: 0,
    focusTime: 0,
    sessions: []
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handlePomodoroComplete = () => {
    setStats(prev => ({
      pomodorosCompleted: prev.pomodorosCompleted + 1,
      focusTime: prev.focusTime + workTime,
      sessions: [
        ...prev.sessions,
        {
          date: new Date().toISOString(),
          duration: workTime,
          type: 'work'
        }
      ]
    }));
  };

  const handleSaveConfig = (newWorkTime, newBreakTime) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setShowConfig(false);
  };

  const handleBluetoothSend = (message) => {
    console.log(`Enviando por Bluetooth: ${message}`);
    // Aquí iría la lógica real de comunicación vía Bluetooth/Web Serial
    setShowBluetooth(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-red-600 text-white">
        <h1 className="text-xl font-bold text-center">Pomodoro Pro</h1>
      </header>

      <main className="max-w-md mx-auto px-4 pb-8">
        {currentScreen === 'timer' && (
          <PomodoroTimer 
            workTime={workTime}
            breakTime={breakTime}
            onComplete={handlePomodoroComplete}
            onConfigClick={() => setShowConfig(true)}
            onConnectESP32={() => setShowBluetooth(true)}
          />
        )}
        {currentScreen === 'info' && <PomodoroInfo />}
        {currentScreen === 'stats' && <StatsScreen stats={stats} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button
            onClick={() => setCurrentScreen('timer')}
            className={`p-2 ${currentScreen === 'timer' ? 'text-red-600' : 'text-gray-600'}`}
          >
            ⏱️ Temporizador
          </button>
          <button
            onClick={() => setCurrentScreen('stats')}
            className={`p-2 ${currentScreen === 'stats' ? 'text-red-600' : 'text-gray-600'}`}
          >
            📊 Estadísticas
          </button>
          <button
            onClick={() => setCurrentScreen('info')}
            className={`p-2 ${currentScreen === 'info' ? 'text-red-600' : 'text-gray-600'}`}
          >
            ℹ️ Información
          </button>
        </div>
      </nav>

      {showConfig && (
        <ConfigModal
          workTime={workTime}
          onSave={handleSaveConfig}
          onClose={() => setShowConfig(false)}
        />
      )}

      {showBluetooth && (
        <BluetoothModal
          onClose={() => setShowBluetooth(false)}
          onSend={handleBluetoothSend}
        />
      )}
    </div>
  );
};

export default App;
