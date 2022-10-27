'use strict';

const socket = io();
let cnt = 0;
const nickname = randomName(10);

/**
 * HTML ELEMENT SELECTER
*/
const GAME_SCENE = document.getElementById('gameScene');
const TAP_TOP = document.querySelector('.tap-top'); 
const TAP_TOP_COUNT = document.querySelector('.tap-top .count'); 
const TAP_BOTTOM = document.querySelector('.tap-bottom');
const TAP_BOTTOM_COUNT = document.querySelector('.tap-bottom .count');

/**
 * TAP CLICK EVENT
*/
document.addEventListener('click', function() {
  cnt += 1;
  const param = {
    name: nickname,
    cnt: cnt
  };
  socket.emit('taptap', param);
});

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
      this.tabEvent(cnt, 'player');
    } else {
      TAP_TOP_COUNT.value = cnt;
      this.tabEvent(cnt, 'enemy');
    }
  }
  this.tabEvent = function(cnt, state) {
    switch (state) {
      case 'player':
        console.log('player');
        break;
      case 'enemy':
        console.log('enemy');
        break;
      default:
        break;
    }
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