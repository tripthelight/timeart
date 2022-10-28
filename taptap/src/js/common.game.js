'use strict';

/**
 * GLOBAL VARIABLE
*/
const socket = io();
let cnt = 0;
const nickname = randomName(10);

/**
 * HTML ELEMENT SELECTOR
*/
const GAME_SCENE =        document.getElementById('gameScene');
const TAP_TOP =           document.querySelector('.tap-top'); 
const TAP_TOP_COUNT =     document.querySelector('.tap-top .count'); 
const TAP_BOTTOM =        document.querySelector('.tap-bottom');
const TAP_BOTTOM_COUNT =  document.querySelector('.tap-bottom .count');
const CIRCLE =            document.querySelector('.circle');

/**
 * TAP CLICK EVENT
*/
document.addEventListener('click', function(event){documentClickEvent(event)} , false);
function documentClickEvent(_event) {
  // circle animation
  circleAnimation(_event);

  // request count
  requestCount();
}
// circle animation
function circleAnimation(_event) {
  if (_event.target.className == 'tap-top') {
    CIRCLE.classList.remove('tap-bottom');
    CIRCLE.classList.add('tap-top');
  }
  if (_event.target.className == 'tap-bottom') {
    CIRCLE.classList.remove('tap-top');
    CIRCLE.classList.add('tap-bottom');
  }
  CIRCLE.style.left = (_event.clientX - 50) + 'px';
  CIRCLE.style.top = (_event.clientY - 50) + 'px';
  CIRCLE.classList.add('active');
  setTimeout(function() { CIRCLE.classList.remove('active'); }, 300);
}
// request count
function requestCount() {
  cnt += 1;
  const param = {
    name: nickname,
    cnt: cnt
  };
  socket.emit('taptap', param);
}

/**
 * RETURN DATA
*/
socket.on('returnMessage', function(data) {
  const ATTACK = new Count(data.name, data.cnt);
  ATTACK.applyCnt();
});

/**
 * DOCUMENT DRAW CLASS
*/
function Count(name, cnt) {
  this.name = name;
  this.cnt = cnt;
  this.applyCnt = function() {
    if (nickname === this.name) {
      TAP_BOTTOM_COUNT.value = cnt;
    } else {
      TAP_TOP_COUNT.value = cnt;
    }
    handleValueChange();
  }
}

/**
 * DOCUMENT CLICK EVENT
*/
TAP_TOP_COUNT.addEventListener('input', handleValueChange, false);
TAP_BOTTOM_COUNT.addEventListener('input', handleValueChange, false);
function handleValueChange() {
  let cntAll = 0;
  cntAll += Math.floor(Number(TAP_TOP_COUNT.value) + Number(TAP_BOTTOM_COUNT.value));
  let cntTop = Math.floor(100 * Number(TAP_TOP_COUNT.value) / cntAll);
  let cntBottom = Math.floor(100 * Number(TAP_BOTTOM_COUNT.value) / cntAll);
  if (cntTop == Infinity || cntBottom == Infinity) {
    TAP_TOP.style.height = '50%';
    TAP_BOTTOM.style.height = '50%';
  } 
  if (cntTop !== Infinity && cntBottom !== Infinity) {
    TAP_TOP.style.height = cntTop + '%';
    TAP_BOTTOM.style.height = cntBottom + '%';
  }
}
/**
 * RENDOM NAME
*/
function randomName(lenth){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`{}[]:;<>?,./|";
  for( var i=0; i < lenth; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}