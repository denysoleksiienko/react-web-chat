import React, { useEffect, useRef, useState } from 'react';
import socket from '../../io';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Chat.css';

export const Chat = ({ users, messages, userName, roomId, setMessages }) => {
  console.log(users.length);
  const [messageValues, setMessageValues] = useState('');
  const messagesRef = useRef(null);

  const handleSendMessage = () => {
    socket.emit('ROOM:MESSAGES', {
      roomId,
      userName,
      text: messageValues,
    });
    setMessages({ userName, text: messageValues });
    setMessageValues('');
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <Container className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form className="chat-form">
          <TextField
            id="filled-multiline-static"
            multiline
            rows={3}
            variant="filled"
            fullWidth={true}
            value={messageValues}
            onChange={(e) => setMessageValues(e.target.value)}
          />
        </form>
        <Button
          type="button"
          className="btn btn-primary"
          variant="outlined"
          color="primary"
          onClick={handleSendMessage}
        >
          Отправить
        </Button>
      </Container>
    </div>
  );
};
