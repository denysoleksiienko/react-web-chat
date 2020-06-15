const express = require('express');
const useSocket = require('socket.io');
const httpServer = require('http');
const cors = require('cors');

const app = express();

app.use(cors());

const server = httpServer.Server(app);
const io = useSocket(server);

const PORT = 5000;
const URL = 'localhost';

const rooms = new Map();

app.get('/rooms', (request, response) => {
  response.json(rooms);
});

io.on('connection', (socket) => {
  console.log('a user connected', socket);
});

app.listen(PORT, URL, (err) => {
  if (err) throw Error(err);
  console.log(`Server start on port: ${URL} ${PORT}`);
});
