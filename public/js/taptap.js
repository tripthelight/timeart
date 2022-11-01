/**
 * GLOBAL VARIABLE
*/
// let socket = io();
let taptapURL = window.location.protocol + "//" + window.location.host;
let socket = io.connect(String(taptapURL));
let matching = true;

/**
 * HTML ELEMENT SELECTOR
*/
const BG =                  document.querySelector('.bg');
const MATCHING =            document.querySelector('.matching');
const MATCHING_PLAYER =     document.querySelector('.matching li.player');
const MATCHING_ENEMY =      document.querySelector('.matching li.enemy');
const ENEMY_DOT_L =         document.querySelector('.matching li.enemy .dot-l');
const ENEMY_DOT_R =         document.querySelector('.matching li.enemy .dot-r');
const READY =               document.querySelector('.ready');
const READY_INNER =         document.querySelector('.ready span');
const TAP_TOP =             document.querySelector('.tap-top');
const TAP_TOP_COUNT =       document.querySelector('.tap-top .count');
const TAP_BOTTOM =          document.querySelector('.tap-bottom');
const TAP_BOTTOM_COUNT =    document.querySelector('.tap-bottom .count');
const CIRCLE =              document.querySelector('.circle');
const INTERJECTION =        document.querySelector('.interjection');
const INTERJECTION_INNER =  document.querySelector('.interjection span');

/**
 * SOCKET
*/
socket.on('connect', function() {
  console.log('Connect to TAP! TAP!');

  enemyDotAni();
  // 요청
  // socket.emit('createMessage', {
  //   from: 'aaa',
  //   text: 'bbb'
  // });

  // 응답 - enemy is comming
  socket.on('newUserJoin', function(message) {
    console.log('newUserJoin', message);
    matching = false;
    waitMatchingEnd();
  });
});

socket.on('updateUsersList', function (users) {
  console.log('users : ', users);
  if (users.length > 2) {

  }
  if (users.length == 2) {
    matching = false;
    waitMatchingEnd();
  }
})

socket.on('disconnect', function() {
  console.log('DisConnect to TAP! TAP!');
});


// 응답
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
// 응답 - 상대방 로그아웃 메시지
socket.on('logoutMessage', function(message) {
  console.log('logoutMessage', message);
});

/**
 * WAIT MATCHING
*/
// ENEMY DOT ANIMATION
function enemyDotAni() {
  const DOT_ANI = setInterval(function() {
    ENEMY_DOT_L.innerText += '.';
    ENEMY_DOT_R.innerText += '.';
    if (ENEMY_DOT_L.innerText.length == 4) ENEMY_DOT_L.innerText = '';
    if (ENEMY_DOT_R.innerText.length == 4) ENEMY_DOT_R.innerText = '';
    if (!matching) clearInterval(DOT_ANI);
  }, 500);
}
// WAIT END
function waitMatchingEnd() {
  BG.classList.remove('show');
  MATCHING.classList.remove('waiting');
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
} else {
  // window close
  localStorage.setItem('taptapTcnt', 0);
  localStorage.setItem('taptapBcnt', 0);
  localStorage.setItem('taptapClosed', true);
}