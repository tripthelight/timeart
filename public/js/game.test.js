let socket = io();

let gameURL = window.location.protocol + "//" + window.location.host;
let nickname = new String();


window.sessionStorage.removeItem('taptaproomName');
window.sessionStorage.removeItem('blackandwhiteroomName');


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
const LOADING = document.querySelector('.loading');
const NAME = document.querySelectorAll('input[name="name"');
const ROOM = document.querySelectorAll('input[name="room"');
const FORM_EL = document.querySelectorAll('form');

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
  for (let i = 0; i < ROOM.length; i++) {
    ROOM[i].value = '';
  }

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

  // socket.on('disconnect', function(data) {
  //   console.log('DisConnect to Game : ', data);
  //   // socket.emit('browserClose', {
  //   //   key: Object.keys(sessionStorage),
  //   //   value: Object.values(sessionStorage)
  //   // });
  // });
});

for (let i = 0; i < ROOM.length; i++) {
  // if (
  //   sessionStorage.getItem("taptaproomName") &&
  //   sessionStorage.getItem("blackandwhiteroomName")
  // ) {
  //   if (ROOM[i].dataset.case == 'taptap') {
  //     ROOM[i].value = sessionStorage.getItem("taptaproomName");
  //   }
  //   if (ROOM[i].dataset.case == 'blackandwhite') {
  //     ROOM[i].value = sessionStorage.getItem("blackandwhiteroomName");
  //   }
  // } else {
  //   socket.emit('roomState', {
  //     case: ROOM[i].dataset.case,
  //   });
  // }
  // console.log(sessionStorage);
  // console.log(Object.keys(localStorage));
  // console.log(Object.values(localStorage));
  // console.log(Object.keys(sessionStorage));
  // console.log(Object.values(sessionStorage));

}

socket.on('roomStateRes', function(data) {
  for (let i = 0; i < ROOM.length; i++) {
    if (ROOM[i].value.length == 0) {
      if (ROOM[i].dataset.case == 'taptap' && data.gameName == 'taptap') {
        ROOM[i].value = data.roomName; 
        sessionStorage.setItem('taptaproomName', data.roomName);
      }
      if (ROOM[i].dataset.case == 'blackandwhite' && data.gameName == 'blackandwhite') {
        ROOM[i].value = data.roomName; 
        sessionStorage.setItem('blackandwhiteroomName', data.roomName);
      }
    }
  }
});

loadingState.hide();

// socket.on('disconnect', function() {
//   console.log('DisConnect to Game : ');
//   socket.emit('browserClose', {
//     key: Object.keys(sessionStorage),
//     value: Object.values(sessionStorage)
//   });
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

/**
 * BROWSER REFRESH CHECK
*/
// if (window.performance) {
//   // this is reload  
//   console.info("window.performance works fine on this browser");
// }
// console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  // console.info( "This page is reloaded" );
  // socket.emit('browserClose', {
  //   key: Object.keys(sessionStorage),
  //   value: Object.values(sessionStorage)
  // });
  // alert('refresh');
} else {
  // window close
  // socket.emit('browserClose', {
  //   key: Object.keys(sessionStorage),
  //   value: Object.values(sessionStorage)
  // });
  // alert('close');
}

