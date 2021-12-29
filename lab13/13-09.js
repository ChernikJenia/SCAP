const udp = require('dgram');
const server = udp.createSocket('udp4');
const PORT = 3000;

server.on('message', (msg, rinfo) => {
    console.log(msg.toString());

    server.send(`ECHO:${msg}`, rinfo.port, rinfo.address, err => {
        if(err) server.close();
    });
});




server.bind(PORT);