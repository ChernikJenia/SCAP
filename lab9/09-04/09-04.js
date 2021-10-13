const http = require('http');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'POST',
    path: '/api',
    headers: {'Content-Type': 'application/json'}
};

const callback = resp => {
    let data = '';

    resp.on('data', chunk => {
        data += chunk;
    })

    resp.on('end', () => {
        console.log(`Status: ${resp.statusCode}`);
        console.log(`Data: ${data}`);
    })
};
const jsonMessage = {
    "_comment" : "Запрос. Лаб 9-4",
    "x" : 1,
    "y" : 2,
    "s" : "Сообщение",
    "m" : ["a","b","c","d"],
    "o" : {"surname" : "Иванов", "name" : "Иван"}
};

const req = http.request(options, callback);

req.on('error', () => console.log('failed to request'));
req.write(JSON.stringify(jsonMessage));
req.end();