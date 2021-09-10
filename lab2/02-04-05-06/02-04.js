const http = require('http');
const fs = require('fs');
const PORT = 5000;
const DATA = 'Черник Евгений Сергеевич';

http.createServer((req, resp) => {
    let url = req.url.toLowerCase();

    if(req.method === "GET" && url === "/api/name") {
        resp.setHeader('Content-Type', "text/plain; charset=utf-8");
        resp.end(DATA);
    }

    else if(['/xmlhttprequest', '/fetch', '/jquery'].indexOf(url) !== -1) {
        let fileName = `${url.slice(1)}.html`;

        fs.access(fileName, (err) => {
            if (err) console.log(err);
            else {
                fs.readFile(fileName, 'utf-8', (err, data) => {
                    resp.contentType = 'text/html';
                    resp.end(data);
                });
            }
        });
    }
    else {
        resp.end("incorrect url");
    }
}).listen(PORT, "localhost", () => {
    console.log(`Listening on ${PORT} port...`);
});
