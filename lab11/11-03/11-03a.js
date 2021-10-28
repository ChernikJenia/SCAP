const { WebSocket } = require('ws');
const url = 'ws://localhost:4000';
const wsc = new WebSocket(url);

wsc.on('open', () => {
   wsc.on('message', data => {
       console.log(String(data));
   });
});


