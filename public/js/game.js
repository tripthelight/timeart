let socket = io();

socket.on('connect', function() {
  console.log('Connect to Server');

  // 요청
  // socket.emit('createMessage', {
  //   from: 'aaa',
  //   text: 'bbb'
  // });
});

socket.on('disconnect', function() {
  console.log('DisConnect to Server');
});

// 응답
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
// 응답 - 상대방 로그아웃 메시지
socket.on('logoutMessage', function(message) {
  console.log('logoutMessage', message);
});