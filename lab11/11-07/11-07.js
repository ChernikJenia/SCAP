const { Server } = require('rpc-websockets');
const PORT = 4000;
const wss = new Server({ port: PORT, host: 'localhost' });

wss.register('A', ({ message }) => console.log(`Notification A: ${message}`));
wss.register('B', ({ message }) => console.log(`Notification B: ${message}`));
wss.register('C', ({ message }) => console.log(`Notification C: ${message}`));


