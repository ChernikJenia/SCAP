const { Client } = require('rpc-websockets');

const ws = new Client('ws://localhost:4000');

ws.on('open', () => {
    ws.subscribe('B');

    ws.on('B', () => {
        console.log('Event B has been happened on the server');
    });
});