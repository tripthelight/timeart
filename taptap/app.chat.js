const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const moment = require('moment');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')));

server.listen(PORT, () => console.log('Server is running: ' , PORT));

io.on('connection', (socket) => {
  socket.on('taptap', (data) => {
    const {name, msg} = data;
    io.emit('returnMessage', {
      name,
      msg,
      time: moment(new Date()).format('h:mm A')
    });
  });
});