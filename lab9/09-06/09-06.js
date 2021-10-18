const http = require('http');
const fs = require('fs');
const fileName = 'MyFile.txt';

const options = {
    host: 'localhost',
    port: 5000,
    method: 'POST',
    path: '/api',
    headers: {'Content-Type': 'text/plain; charset=utf-8'}
}

const callback = resp => {
    resp.pipe(process.stdout);
};

const request = http.request(options, callback);

fs.createReadStream(fileName, 'utf-8')
    .pipe(request);
