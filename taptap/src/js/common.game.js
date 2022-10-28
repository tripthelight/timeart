'use strict';

/**
 * GLOBAL VARIABLE
*/
const socket = io();
const nickname = randomName(10);
const IINTERJECTION = [
  'AWW',
  'YAY',
  'OOH LA LA',
  'GOOD',
  'COOL',
  'HOORAY',
  'GREATE',
  'AWESOME'
];
let ww = window.innerWidth;
let wh = window.innerHeight;
let cnt = 0;
let ijNum = 0;
let ijTxt = new String();

/**
 * HTML ELEMENT SELECTOR
*/
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
 * DOCUMENT READY
*/
document.addEventListener('readystatechange', function(event) { 
  if (event.target.readyState === 'complete') {
    readyInit();
  }
});

/**
 * DOCUMENT RESIZE
*/
window.addEventListener('resize', function(){
  readyStyle();
});

/**
 * READY ELEMENT INIT
*/
function readyInit() {
  READY.classList.add('active');
  readyStyle();
  readyCount();
}
function readyStyle() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  if (ww > wh) {
    READY.style.width = READY.style.height = Math.floor(wh - 40) + 'px';
    READY_INNER.style.fontSize = Math.floor(wh / 1.2) + 'px';
  }
  if (ww < wh || ww == wh) {
    READY.style.width = READY.style.height = Math.floor(ww - 40) + 'px';
    READY_INNER.style.fontSize = Math.floor(ww / 1.2) + 'px';
  }
}

/**
 * READY COUNT
*/
function readyCount() {
  READY_INNER.innerText = 3;
  setTimeout( function() { READY_INNER.innerText = 2; }, 1000);
  setTimeout( function() { READY_INNER.innerText = 1; }, 2000);
  setTimeout( function() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    if (ww > wh) READY_INNER.style.fontSize = Math.floor(wh / 3) + 'px';
    if (ww < wh || ww == wh) READY_INNER.style.fontSize = Math.floor(ww / 3) + 'px';
    READY_INNER.innerText = 'TAP!';
  }, 3000);
  setTimeout( function() { READY.classList.remove('active');READY.classList.remove('start'); }, 4000);
}

/**
 * TAP CLICK EVENT
*/
document.addEventListener('click', function(event){if (!READY.classList.contains('active')) documentClickEvent(event)} , false);
function documentClickEvent(_event) {
  // circle animation
  circleAnimation(_event);

  // request count
  requestCount();

  // interjection
  interjection();
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
// INTERJECTION
function interjection() {
  if (Number(TAP_BOTTOM_COUNT.value) > Number(TAP_TOP_COUNT.value)) {
    interjectionComn();
  }
}
function interjectionComn() {
  if (ijNum > -1 && ijNum < IINTERJECTION.length) {
    ijTxt = '';
    ijTxt = String(IINTERJECTION[ijNum]);
    interjectionEvt();
  } else {
    ijNum = 0;
    ijTxt = String(IINTERJECTION[ijNum]);
  }
}
function interjectionEvt() {
  if (!INTERJECTION.classList.contains('active')) {
    INTERJECTION_INNER.innerText = '';
    INTERJECTION_INNER.innerText = ijTxt;
    INTERJECTION.classList.add('active');
    ijNum+=1;
    setTimeout(function() { 
      if (INTERJECTION.classList.contains('active')) {
        INTERJECTION.classList.remove('active');
        ijTxt = '';
      }
    }, 600);
  }
}

/**
 * RESPONSE DATA
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
 * INPUT VALUE - COUNT - CHANGE EVENT
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
