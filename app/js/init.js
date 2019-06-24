var HOST = 'ws://pin-pon.herokuapp.com';

var ws = new WebSocket(HOST);
var el = document.getElementById('server-time');

ws.onmessage = function (event) {
    el.innerHTML = 'Server time: ' + event.data;
};