const x = process.argv[2];
const net = require('net');
const PORT = 4000;
const HOST = '127.0.0.1';
const client = net.Socket();

client.connect(PORT, HOST, () => {
    setInterval(() => {
        client.write(x.toString());
    }, 1000);

});

client.on('data', chunk => {
    console.log(chunk);
});
