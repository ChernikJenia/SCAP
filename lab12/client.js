const { Client } = require('rpc-websockets');
const ws = new Client('ws://localhost:4000');

ws.on('open', () => {
    console.log('connected..');

    ws.subscribe('file_changed');
    ws.on('file_changed', (file) => {
        console.log(`File ${file} has been changed`);
    });


    ws.on('message', (message) => {
        console.log(`Message from server: ${message}`);
    });
});
