const net = require('net');
const PORT = 4000;

const server = new net.Server();

let sum = 0;

server.on('connection', socket => {
    const clientName = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`${clientName} has been connected...`);

    socket.on('data', chunk => {
        console.log(`${clientName}: ${chunk}`);
        sum += chunk.readInt32LE();
    });

    let buf = Buffer.alloc(4);

    setInterval(() => {
        console.log(buf);

        buf.writeInt32LE(sum, 0);
        socket.write(buf);
    }, 5000);

    socket.on('end', () => {
        console.log(`${socket.remoteAddress}: ${socket.remotePort} has been disconnected..`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});

server.on('error', () => {
    console.log('Error...');
});

