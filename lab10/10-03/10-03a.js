const { WebSocket } = require('ws');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    console.log('Connected');
});

ws.on('message', message => {
    console.log('%s', message);
});

ws.on('error', () => {
    console.log('failed to connect');
});

