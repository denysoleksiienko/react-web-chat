import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Login.css';

export const Login = () => {
  return (
    <div className="login">
      <form className="login-form" autoComplete="off">
        <div className="form-field">
          <TextField id="room" className="room-field" type="text" name="room" label="Room ID" variant="filled" />
        </div>
        <div className="form-field">
          <TextField id="user" className="user-field" type="text" name="user" label="User name" variant="filled" />
        </div>
        <Button className="btn btn-login" type="button" variant="contained" color="primary">
          LOGIN
        </Button>
      </form>
    </div>
  );
};
