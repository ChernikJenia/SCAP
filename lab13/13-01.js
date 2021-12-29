const net = require('net');
const PORT = 4000;
const server = new net.Server();

server.on('connection', socket => {
    const clientName = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`${clientName} has been connected...`);

    socket.on('data', chunk => {
        console.log(`${clientName}: ${chunk}`);
        socket.write(`ECHO: ${chunk.toString()}`);
    });

    socket.on('end', () => {
        console.log(`${socket.remoteAddress}: ${socket.remotePort} has been disconnected..`);
    });
});

server.listen(PORT, () => {
    console.log(`server is listening to ${PORT}...`);
});



