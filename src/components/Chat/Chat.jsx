import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Chat.css';

export const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b></b>
        <hr />
        <b>Online :</b>
        <ul>
          <li>name</li>
        </ul>
      </div>
      <Container className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>text</p>
            <div>
              <span>user</span>
            </div>
          </div>
        </div>
        <form className="chat-form">
          <TextField id="filled-multiline-static" multiline rows={3} variant="filled" fullWidth={true} />
        </form>
        <Button type="button" className="btn btn-primary" variant="outlined" color="primary">
          Отправить
        </Button>
      </Container>
    </div>
  );
};
