import React, { useState } from 'react';
import VerificationFlow from './components/VerificationFlow';
import Dashboard from './components/Dashboard';

type AppState = 'verification' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('verification');

  const handleVerificationComplete = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('verification');
  };

  return (
    <div className="App">
      {appState === 'verification' ? (
        <VerificationFlow onComplete={handleVerificationComplete} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;