const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user just connect :)');

  
  // socket.on('join', (params, callback) => {
  //   socket.join(params.room);
  //   users.removeUser(socket.id);
  //   users.addUser(socket.id, params.name, params.room);

  //   io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
  //   socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));

  //   socket.broadcast.to(params.room).emit('newUserJoin', generateMessage('Admin', "New User Joined!"));

  //   callback();
  // });

  // socket.on('createMessage', (message, callback) => {
  //   io.emit('newMessage', generateMessage(message.from, message.text));
  //   callback();
  // });

  // socket.on('disconnect', function() {
  //   console.log('User was disconnected :(');
  //   let user = users.removeUser(socket.id);

  //   if(user){
  //     io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
  //     io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room.`))
  //   }
  // });

  // socket.on('roomState', (data) => {
  //   let gameName = data.case;
  //   let jsonUrl = '';
    
  //   switch (gameName) {
  //     case 'taptap': jsonUrl = './server/databases/taptap.json';  break;
  //     case 'blackandwhite': jsonUrl = './server/databases/blackandwhite.json';  break;
  //   }
  //   let roomData = loadJSON(jsonUrl);
  //   if (roomData.length == 0) {
  //     const roomName = randomName(10);
  //     roomData.push({"name":roomName, "state":"false", "person":"1"});
  //     saveJSON(jsonUrl, roomData);
  //     socket.emit('roomStateRes', {roomName:roomName, gameName:gameName});
  //   } else {
  //     const selectRoom = roomData.map((rooms, index) => {
  //       if (rooms.person == '2') {
  //         const roomName = randomName(10);
  //         roomData.push({"name":roomName, "state":"false", "person":"1"});
  //         return roomName;
  //       }
  //       if (rooms.person == '1') {
  //         rooms.person = '2';
  //         return rooms.name;
  //       }
  //     });
      
  //     saveJSON(jsonUrl, roomData);
  //     socket.emit('roomStateRes', {roomName:selectRoom, gameName:gameName});
  //   }
  // });

  // socket.on('browserClose', (values) => {
  //   console.log('browserClose >>>>>> ', values);
  // });
});

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));
