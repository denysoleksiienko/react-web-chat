import React from 'react';
import { Login } from './components/Login/Login';
import { Chat } from './components/Chat/Chat';
import { socket } from './io';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Login />
      <Chat />
    </div>
  );
};

export default App;
