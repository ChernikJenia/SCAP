const udp = require('dgram');
const client = udp.createSocket('udp4');
const PORT = 3000;


client.send('Hello server', PORT, 'localhost', err => {
    if(err) client.close();
});

client.on('message', (msg, rinfo) => {
    console.log(msg.toString());
});