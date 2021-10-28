const { WebSocket } = require('ws');
const fs = require('fs');

const url = 'ws://localhost:4000';

const wsc = new WebSocket(url);

wsc.on('open', () => {
    console.log("connected");

    fs.readFile('1.txt', 'utf-8', (err, data) => {
        wsc.send(data);
    });
});
