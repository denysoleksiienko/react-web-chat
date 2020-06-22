import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Login.css';

export const Login = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      alert('Wrong');
    }
    const obj = {
      roomId,
      userName,
    };
    setIsLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="login">
      <form className="login-form" autoComplete="off">
        <div className="form-field">
          <TextField
            id="room"
            className="room-field"
            type="text"
            name="room"
            label="Room ID"
            variant="filled"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div className="form-field">
          <TextField
            id="user"
            className="user-field"
            type="text"
            name="user"
            label="User name"
            variant="filled"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={onEnter}
          className="btn btn-login"
          type="button"
          variant="contained"
          color="primary"
        >
          {isLoading ? 'Entering...' : 'LOGIN'}
        </Button>
      </form>
    </div>
  );
};
