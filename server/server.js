const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
let server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../');
const roomsList = [];
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  // res.sendFile(publicPath + '/index.html');
  res.render(path.join(publicPath, '/', 'index.html'),{rooms: roomsList});
});
app.get('/executive', (req, res) => {
  res.sendFile(publicPath + '/executive.html');
});
app.get('/engineer', (req, res) => {
  res.sendFile(publicPath + '/engineer.html');
});
app.get('/room/', (req, res) => {
  let name = req.query.name;
  res.render(path.join(publicPath, '/', 'rooms.html'),{rooms: name});
});
app.get('/addRoom/', (req, res) => {
  let name = req.query.name;
  roomsList.push(name);
  console.log(JSON.stringify(roomsList));
  res.send(200);
});

const adminNameSpace = io.of('/admin');
adminNameSpace.on('connect', (socket) => {
  // console.log('a user connected');
  socket.on('join', (data) => {
    socket.join(data.room);
    adminNameSpace.in(data.room).emit('chat message', `New Person joined the ${data.room} room`);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (data) => {
    console.log('message: ' + data.msg);
    adminNameSpace.in(data.room).emit('chat message', data.msg);
  });
  socket.on('send msg to all', (data) => {
    console.log('message: ' + data.msg);
    adminNameSpace.emit('chat message', data.msg);
  });
});

server.listen(PORT, () => console.log(`Serve is running: ${PORT}`));
