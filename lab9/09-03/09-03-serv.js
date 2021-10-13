const http = require('http');
const url = require('url');
const PORT = 5000;

http.createServer((req, resp) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        let bodyObj = JSON.parse(body);

        resp.end(`x=${bodyObj.x}, y=${bodyObj.y}, s=${bodyObj.s}`);
    })


}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
