import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import './Chat.css';

export const Chat = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>

      <div>
        <TextField
          id="message"
          className="message-field"
          label="Message"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
        />
      </div>
    </React.Fragment>
  );
};
