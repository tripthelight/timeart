const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user just connect :)');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Game ;)'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Join :)'));

  socket.on('createMessage', (message, callback) => {
    // 반환
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('disconnect', function() {
    console.log('User was disconnected :(');
    // 상대방 로그아웃 메시지
    // socket.broadcast.emit('logoutMessage', {
    //   text: '상대방이 로그아웃함',
    //   createAt: new Date().getTime()
    // })
  });
});

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));