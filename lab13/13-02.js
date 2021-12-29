const net = require('net');
const PORT = 4000;
const HOST = '127.0.0.1';
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Connected...`);
    client.write('hello from client');
});

client.on('data', chunk => {
    console.log(`SERVER: ${chunk}`);
});

client.on('close', () => {
    console.log('Disconnected...');
});

client.on('error', () => {
    console.log('Error...');
});
