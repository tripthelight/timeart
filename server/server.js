const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user just connect :)');

  socket.on('join', (params, callback) => {
    // console.log('socket.id : ', socket.id);
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newUserJoin', generateMessage('Admin', "New User Joined!"));

    callback();
  });

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Game ;)'));
  // socket.broadcast.emit('newUser', generateMessage('Admin', 'New User Join :)'));

  socket.on('createMessage', (message, callback) => {
    // 반환
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('disconnect', function() {
    console.log('User was disconnected :(');
    let user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
    }
    // 상대방 로그아웃 메시지
    // socket.broadcast.emit('logoutMessage', {
    //   text: '상대방이 로그아웃함',
    //   createAt: new Date().getTime()
    // })
  });
});

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));