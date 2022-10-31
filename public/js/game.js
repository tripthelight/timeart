let socket = io();

let nickname = new String();
let roomNum = 0;

if (localStorage.getItem('timeArtName')) {
  nickname = localStorage.getItem('timeArtName');
} else {
  nickname = randomName(10);
  localStorage.setItem('timeArtName', nickname);
}

console.log('nickname : ', nickname);

/**
 * HTML ELEMENT
*/
const NAME = document.querySelectorAll('input[name="name"');
const ROOM = document.querySelectorAll('input[name="room"');
const FORM_EL = document.querySelectorAll('form');

/**
 * ADD NAME
*/
if (NAME.length > 0) {
  for (let i = 0; i < NAME.length; i++) {
    NAME[i].value = nickname;  
  }
}

socket.on('connect', function() {
  console.log('connect >>>> ');
  roomNum++;
  for (let i = 0; i < ROOM.length; i++) {
    ROOM[i].value = ROOM[i].value.slice(0, -1) + roomNum;
    
  }
  // console.log('Connect to Server');

  // 요청
  // socket.emit('createMessage', {
  //   from: 'aaa',
  //   text: 'bbb'
  // });
});

// socket.on('disconnect', function() {
//   console.log('DisConnect to Server');
// });

// // 응답
// socket.on('newMessage', function(message) {
//   console.log('newMessage', message);
// });
// // 응답 - 상대방 로그아웃 메시지
// socket.on('logoutMessage', function(message) {
//   console.log('logoutMessage', message);
// });

/**
 * RENDOM NAME
*/
function randomName(lenth){
  let text = '';
  // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`{}[]:;<>?,./|";
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for( let i=0; i < lenth; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}