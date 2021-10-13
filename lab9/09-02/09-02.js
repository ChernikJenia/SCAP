const http = require('http');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'GET',
    path: '/api?x=2&y=3'
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

http.request(options, callback)
    .on('error', (err) => console.log('failed to connect'))
    .end();