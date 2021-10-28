const { Client } = require('rpc-websockets');
const readline = require("readline");
const ws = new Client('ws://localhost:4000');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const handleInput = (msg) => {
    let [ notification, message ] = msg.split(' ');

    switch (notification) {
        case 'A':
            ws.notify('A', { message: message });
            break;
        case 'B':
            ws.notify('B', { message: message });
            break;
        case 'C':
            ws.notify('C', { message: message });
            break;
        default:
            console.log('non-existed notification');
            break;
    }
}

ws.on('open', () => {
    rl.on('line', (msg) => {
        handleInput(msg);
    });
});

