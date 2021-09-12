const http = require('http');
const { URL } = require('url');
const fs = require("fs");
const PORT = 5000;
const fileName = '../03-03/fetch.html';
const factorial = (k) => k <= 1 ? 1 : k * factorial(k - 1);

function Fact(k, fn) {
    this.k = k;
    this.fn = fn;
    this.fact = factorial;
    this.calc = () => {
        process.nextTick(() => { this.fn(null, this.fact(this.k)) })
    }
}

http.createServer((req, resp) => {
    const url = new URL(`http://${req.headers["host"]}${req.url}`);

    if(url.pathname === '/fact') {
        let k = parseInt(url.searchParams.get('k'));

        if(Number.isInteger(k)) {
            resp.writeHead(200, {'Content-Type' : 'application/json'});

            let f = new Fact(k, (err, res) => {
                resp.end(JSON.stringify({ k: k, fact : res }));
            })
            f.calc();
        }
    }
    else if(url.pathname === '/') {
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
    else {
        resp.statusCode  = 404;
        resp.end('incorrect url');
    }


}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
