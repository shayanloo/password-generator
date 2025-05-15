import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <PasswordGenerator />
      </div>
    </div>
  );
}

export default App;