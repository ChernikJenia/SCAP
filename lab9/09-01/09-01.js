const http = require('http');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'GET',
    path: '/api'
};

const callback = (resp) => {
    let data = '';

    resp.on('data', chunk => {
        data += chunk;
    })

    resp.on('end', () => {
        console.log(`${resp.statusCode} ${resp.statusMessage}`);
        console.log(`ip: ${resp.socket.remoteAddress}, port: ${resp.socket.remotePort}`);
        console.log(`Data: ${data}`);
    })
}

http.request(options, callback).end();
