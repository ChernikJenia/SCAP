const { Client } = require('rpc-websockets');

const ws = new Client('ws://localhost:4000');

ws.on('open', () => {
    ws.subscribe('C');

    ws.on('C', () => {
        console.log('Event C has been happened on the server');
    });
});