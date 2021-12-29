const net = require('net');
const PORT = 4000;
const HOST = '127.0.0.1';

const client = new net.Socket();

let buf = new Buffer.alloc(4);

client.connect(PORT, HOST, () => {
    console.log(`Connected...`);

    let k = 0;

    const intInterval = setInterval(() => {
        buf.writeInt32LE(k++, 0);
        client.write(buf);
        }
    , 1000);

    setTimeout(() => {
        clearInterval(intInterval);
        client.end();
    }, 20000);
});

client.on('data', chunk => {
    console.log(`Subtotal: ${chunk}`);
});

client.on('close', () => {
    console.log('Disconnected...');
});

client.on('error', () => {
    console.log('Error...');
});
