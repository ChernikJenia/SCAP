const { WebSocket } = require('ws');
const fs = require('fs');

const url = 'ws://localhost:4000';

const wsc = new WebSocket(url);

wsc.on('open', () => {
    const wsStream = WebSocket.createWebSocketStream(wsc, { encoding: 'utf-8' });

    wsStream.pipe(process.stdout);
});
