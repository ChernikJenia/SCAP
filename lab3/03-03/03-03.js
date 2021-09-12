const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const fileName = './fetch.html';
const PORT = 5000;
const factorial = (k) => k <= 1 ? 1 : k * factorial(k - 1);

http.createServer((req, resp) => {
    const url = new URL(`http://${req.headers["host"]}${req.url}`);

    if(url.pathname === '/') {
        fs.access(fileName, (err)  => {
            if(err) {
                console.log(err);
            }
            fs.readFile(fileName, 'utf-8', (e, data) => {
                resp.writeHead(200, { 'Content-Type' : 'text/html'} );
                resp.end(data);
            })
        })
    }
    else if(url.pathname === '/fact') {
        let k = parseInt(url.searchParams.get('k'));

        if(Number.isInteger(k)) {
            resp.writeHead(200, {'Content-Type' : 'application/json'});
            resp.end(JSON.stringify({ k: k, fact : factorial(k) }));
        }
    }
    else {
        resp.statusCode = 404;
        resp.end('incorrect url');
    }


}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
