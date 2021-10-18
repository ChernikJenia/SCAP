const http = require('http');
const fs = require('fs');
const fileName = 'MyFile.png';

const options = {
    host: 'localhost',
    port: 5000,
    method: 'POST',
    path: '/api',
    headers: {'Content-Type': 'image/png'}
}

const callback = resp => {
    resp.pipe(process.stdout);
};

const request = http.request(options, callback);

fs.createReadStream(fileName)
    .pipe(request);
