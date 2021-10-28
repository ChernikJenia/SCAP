const { WebSocket } = require('ws');
const url = 'ws://localhost:4000';
const wsc = new WebSocket(url);
const NAME = process.argv[2] || 'Sanya';

wsc.on('open', () => {
   wsc.send(JSON.stringify({
       client: NAME,
       timestamp: new Date().toLocaleString()
   }));
});

wsc.on('message', (data) => {
    console.log(JSON.parse(data));
});
