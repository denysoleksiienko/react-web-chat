import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import socket from './io';

import { reducer } from './reducer';
import { Login } from './components/Login/Login';
import { Chat } from './components/Chat/Chat';

import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'IS_AUTH',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const setMessages = (message) => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:MESSAGES', setMessages);
  }, []);

  return (
    <div className="App">
      {!state.isAuth ? <Login onLogin={onLogin} /> : <Chat {...state} setMessages={setMessages} />}
    </div>
  );
};

export default App;
