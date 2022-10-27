'use strict';

const socket = io();

/*
const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');

sendButton.addEventListener('click', function() {
  const param = {
    name: nickname.value,
    msg: chatInput.value
  };
  socket.emit('taptap', param);
});

socket.on('returnMessage', function(data) {
  const li = document.createElement('li');
  li.innerText = data.name + '님이 ' + data.msg;
  chatList.appendChild(li);
});
*/

/**
 * HTML ELEMENT SELECTER
*/
const GAME_SCENE = document.getElementById('gameScene');
const TAP_TOP = document.querySelector('.tap-top'); 
const TAP_TOP_COUNT = document.querySelector('.tap-top .count'); 
const TAP_BOTTOM = document.querySelector('.tap-bottom');
const TAP_BOTTOM_COUNT = document.querySelector('.tap-bottom .count');

let cnt = 0;
TAP_TOP.addEventListener('click', function() {
  cnt += 1;
  socket.emit('taptap', cnt);
});
socket.on('returnMessage', function(data) {
  TAP_TOP_COUNT.innerText = data;
});