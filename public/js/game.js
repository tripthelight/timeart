let socket = io();

let gameURL = window.location.protocol + "//" + window.location.host;
let nickname = new String();
// let roomNum = 0;

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
const GAME_BTN = document.querySelectorAll('.btn-game');
const LOADING = document.querySelector('.loading');

/**
 * LOADING
 */
const loadingState = {
  show: function() {
    LOADING.classList.add('show');
  },
  hide: function() {
    LOADING.classList.remove('show');
  }
}

loadingState.show();

/**
 * ADD NAME
*/
if (NAME.length > 0) {
  for (let i = 0; i < NAME.length; i++) {
    NAME[i].value = nickname;  
  }
}

/**
 * socket
 */
socket.on('connect', function() {
  // request room
  // for (let i = 0; i < ROOM.length; i++) {
  //   ROOM[i].value = ROOM[i].value.slice(0, -1) + roomNum;
  // }

  // roomNum++;
  // for (let i = 0; i < ROOM.length; i++) {
  //   ROOM[i].value = ROOM[i].value.slice(0, -1) + roomNum;
  // }
  // console.log('Connect to Server');

  // 요청
  // socket.emit('createMessage', {
  //   from: 'aaa',
  //   text: 'bbb'
  // });
});

/** X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=X=
 * 새로고침 할 때 마다 인원수가 +1 됨
 */
for (let i = 0; i < ROOM.length; i++) {
  if (ROOM[i].value.length == 0) {
    socket.emit('roomState', {
      case: 'taptap',
      state: 'false'
    });
  }
}

socket.on('roomStateRes', function(data) {
  loadingState.hide();

  for (let i = 0; i < ROOM.length; i++) {
    if (ROOM[i].value.length == 0) {
      ROOM[i].value = data;
    }
  }
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
 * button click event
 */
for (let i = 0; i < GAME_BTN.length; i++) {
  GAME_BTN[i].addEventListener('click', gameBtnClick, false);
}

function gameBtnClick () {
  // show loading
  loadingState.show();

  // request room
  socket.emit('roomState', {
    case: this.dataset.game,
    state: 'false'
  });
}


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

