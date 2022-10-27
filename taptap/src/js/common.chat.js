'use strict';

const socket = io();
// const nickname = document.querySelector('#nickname');
const nickname = randomName(10);
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');

sendButton.addEventListener('click', function() {
  const param = {
    // name: nickname.value,
    name: nickname,
    msg: chatInput.value
  };
  socket.emit('taptap', param);
});

socket.on('returnMessage', function(data) {
  // const {name, msg, time} = data;
  const item = new LiModel(data.name, data.msg, data.time);
  item.makeLi();
});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;
  this.makeLi = function() {
    const li = document.createElement('li');
    li.classList.add(nickname === this.name ? 'sent': 'receive');
    // const dom = `
    //   <span class="message">${this.msg}</span>
    //   <span class="time">${this.time}</span>
    // `;
    const dom = '<span class="message">'+this.msg+'</span><span class="time">'+this.time+'</span>';
    li.innerHTML = dom;
    chatList.appendChild(li);
  }
}

function randomName(lenth){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`{}[]:;<>?,./|";
  for( var i=0; i < lenth; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
