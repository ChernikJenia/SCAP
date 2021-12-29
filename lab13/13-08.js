const net = require('net');
const timerID = null;
const HOST = '127.0.0.1';
const PORT = process.argv[2];
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    let k = 0;
    console.log('Client connected: ', client.remoteAddress +' ' + client.remotePort);
    timerID = setInterval(() => {
        client.write(`${++k}`);
    }, 1000);
    
    setTimeout(() => {
        clearInterval(timerID);
        client.end();
    }, 20000);
})
client.on('data', (data) => console.log('Server answer: ', data.toString()));