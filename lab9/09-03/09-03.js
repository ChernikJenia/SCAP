const http = require('http');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'POST',
    path: '/api'
};

const callback = (resp) => {
    let data = '';

    resp.on('data', chunk => {
        data += chunk;
    })

    resp.on('end', () => {
        console.log(`Status:${resp.statusCode}, Data: ${data}`);
    })
}

const req = http.request(options, callback);

req.on('error', () => console.log('failed to connect'));
req.write(JSON.stringify({ x : 5, y : 10, s: '09-03 POST' }));
req.end();
