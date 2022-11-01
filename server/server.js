const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString');
const {Users} = require('./utils/users');
const {loadJSON, saveJSON} = require('./utils/databases');
const {randomName} = require('./utils/randomName');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

let i = 0;
let testInt;

io.on('connection', (socket) => {
  if (i > 0) {
    clearInterval(testInt);
  }
  console.log('A new user just connect :)');
  
  socket.on('join', (params, callback) => {
    console.log('join >>>>> ');
    // console.log('socket.id : ', socket.id);
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));

    socket.broadcast.to(params.room).emit('newUserJoin', generateMessage('Admin', "New User Joined!"));

    callback();
  });

  // io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
  // socket.broadcast.emit('newUserJoin', generateMessage('Admin', "New User Joined!"));

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

    
    // testInt = setInterval(() => {
    //   i += 1;
    //   console.log('타냐');
    //   if (i > 30) {
    //     clearInterval(testInt);
    //     console.log('끝');

    //     // console.log('key >>> ', values.key);
    //     // console.log('value >>> ', values.value);
    //     // values.key.forEach((keys, index) => {
    //     //   let keyRes = keys.slice(0,keys.length-8);
    //     //   let jsonUrl = `./server/databases/${keyRes}.json`;

    //     //   let jsonData = loadJSON(jsonUrl);
    //     //   if (jsonData.name == values.value[index]) {
    //     //     if (jsonData.person == '2') {
    //     //       jsonData.person = '1'
    //     //     }
    //     //     if (jsonData.person == '1') {
    //     //       delete jsonData[index];
    //     //     }
    //     //   }
      
    //     //   saveJSON(jsonUrl, jsonData);
    //     // });
    //   }
    // }, 100);
    // 상대방 로그아웃 메시지
    // socket.broadcast.emit('logoutMessage', {
    //   text: '상대방이 로그아웃함',
    //   createAt: new Date().getTime()
    // })
  });

  socket.on('roomState', (data) => {
    let gameName = data.case;
    let jsonUrl = '';
    
    switch (gameName) {
      case 'taptap': jsonUrl = './server/databases/taptap.json';  break;
      case 'blackandwhite': jsonUrl = './server/databases/blackandwhite.json';  break;
    }
    let roomData = loadJSON(jsonUrl);
    if (roomData.length == 0) {
      const roomName = randomName(10);
      roomData.push({"name":roomName, "state":"false", "person":"1"});
      saveJSON(jsonUrl, roomData);
      socket.emit('roomStateRes', {roomName:roomName, gameName:gameName});
    } else {
      const selectRoom = roomData.map((rooms, index) => {
        if (rooms.person == '2') {
          const roomName = randomName(10);
          roomData.push({"name":roomName, "state":"false", "person":"1"});
          return roomName;
        }
        if (rooms.person == '1') {
          rooms.person = '2';
          return rooms.name;
        }
      });
      
      saveJSON(jsonUrl, roomData);
      socket.emit('roomStateRes', {roomName:selectRoom, gameName:gameName});
    }
  });

  socket.on('browserClose', (values) => {
    console.log('browserClose >>>>>> ', values);
    // console.log('key >>> ', values.key);
    // console.log('value >>> ', values.value);
    // values.key.forEach((keys, index) => {
    //   let keyRes = keys.slice(0,keys.length-8);
    //   let jsonUrl = `./server/databases/${keyRes}.json`;

    //   let jsonData = loadJSON(jsonUrl);
    //   if (jsonData.name == values.value[index]) {
    //     if (jsonData.person == '2') {
    //       jsonData.person = '1'
    //     }
    //     if (jsonData.person == '1') {
    //       delete jsonData[index];
    //     }
    //   }
  
    //   saveJSON(jsonUrl, jsonData);
    // });
  });

  // socket.on('disconnectState', (values) => {
  //   console.log('disconnectState >>>>>> ');
  // });

});

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));
