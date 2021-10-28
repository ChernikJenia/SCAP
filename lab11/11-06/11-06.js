const { Server } = require('rpc-websockets');
const readline = require('readline');
const PORT = 4000;
const wss = new Server({ port: PORT, host: 'localhost' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

wss.event('A');
wss.event('B');
wss.event('C');

wss.on('A', () => console.log('Event A'));
wss.on('B', () => console.log('Event B'));
wss.on('C', () => console.log('Event C'));

rl.on('line', (data) => {
    wss.eventList().includes(data) ?
        wss.emit(data) :
        console.log('non-existent event');
});
