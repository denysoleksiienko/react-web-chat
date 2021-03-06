const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

// const cors = require('cors');
// app.use(cors());

const PORT = 8081;
const URL = 'localhost';

const rooms = new Map();

app.get('/rooms/:id', (request, response) => {
  const { id: roomId } = request.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : { users: [], messages: [] };
  response.json(obj);
});

app.post('/rooms', (request, response) => {
  const { roomId } = request.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    );
  }
  response.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
    console.log(roomId, userName);
  });

  socket.on('ROOM:MESSAGES', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };

    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:MESSAGES', obj);
  });

  socket.on('disconnect', (socket) => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });
  console.log('user connected', socket.id);
});

server.listen(PORT, URL, (err) => {
  if (err) throw Error(err);
  console.log(`Server start on: ${URL}:${PORT}`);
});
