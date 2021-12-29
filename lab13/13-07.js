const net = require('net');
const HOST = '0.0.0.0';
const PORT1 = 40000;
const PORT2 = 50000;

const onListening = () => console.log('TCP-server ', HOST + ':' + PORT1);
const h = (n) => (sock) => {
    console.log('Server Connected: '+ sock.remoteAddress + ':' + sock.remoteAddress);
    sock.on('data',(data) => {
        console.log('Number: ', data.toString());
        sock.write('ECHO:' + data);
    });
    sock.on('close', () => console.log("Server closed"));
  };

net.createServer(h(PORT1)).listen(PORT1,HOST).on('listening', onListening);
net.createServer(h(PORT2)).listen(PORT2,HOST).on('listening', onListening);