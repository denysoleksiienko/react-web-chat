const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// const cors = require('cors');
// app.use(cors());

const PORT = 8081;
const URL = 'localhost';

const rooms = new Map();

app.get('/rooms', (request, response) => {
  response.json(rooms);
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(PORT, URL, (err) => {
  if (err) throw Error(err);
  console.log(`Server start on: ${URL}:${PORT}`);
});
