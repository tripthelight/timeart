let socket = io();

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

/**
 * socket
 */

