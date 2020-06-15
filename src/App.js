import React from 'react';
import socket from './io';

import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick={() => socket}>BUTTON</button>
    </div>
  );
}

export default App;
