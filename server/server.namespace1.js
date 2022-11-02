const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (server) => {
  
});

const gameRoom = ['taptap', 'blackandwhite1'];

io
  .of('/games')
  .on('connection', (socket) => {
    socket.emit('welcome', 'hello and welcome to the Games Area :)');
    socket.on('joinRoom', (room) => {
      if (gameRoom.includes(room)) {
        socket.join(room);
        io
          .of('/games')
          .in(room)
          .emit('newUser', 'New Player has joined the ' + room);
        return socket.emit('success', 'You have successfully Joined this Room');
      } else {
        return socket.emit('err', 'ERROR, No Room named ' + room);
      }

      
    });
  });

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));
