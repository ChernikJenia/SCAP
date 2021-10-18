const http = require('http');
const fs = require('fs');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'GET',
    path: '/sss',
    headers: {'Please': 'Give me some file'}
}

const callback = resp => {
    let ext = 'log';

    console.log(resp.headers);
    switch (resp.headers['content-type']) {
        case "image/png":
            ext = 'png';
            break;
        case "application/json":
            ext = 'json';
            break;
        default:
            ext = 'txt';
            break;
    }

    let writeStream = fs.createWriteStream(`response.${ext}`);
    resp.pipe(writeStream);
};

const request = http.request(options, callback);

request.end();
