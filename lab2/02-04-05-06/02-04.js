const http = require('http');
const fs = require('fs');
const PORT = 5000;
const DATA = 'Черник Евгений Сергеевич';
const fileName = './xmlhttprequest.html';
const fetchFileName = './fetch.html';
const jqueryFileName = './jquery.html';

http.createServer((req, resp) => {
    if(req.method === "GET" && req.url.toLowerCase() === "/api/name") {
        resp.setHeader('Content-Type', "text/plain; charset=utf-8");
        resp.end(DATA);
    }
    else if(req.url.toLowerCase() === "/xmlhttprequest"){
        fs.access(fileName, (err) => {
            if(err) console.log(err);
            else {
                fs.readFile(fileName, 'utf-8',(err, data) => {
                    resp.contentType = 'text/html';
                    resp.end(data);
                })
            }

        })
    }
    else if(req.url.toLowerCase() === "/fetch") {
        fs.access(fetchFileName, (err) => {
            if(err) console.log(err);
            else {
                fs.readFile(fetchFileName, 'utf-8', (err, data) => {
                   resp.contentType = 'text/html';
                   resp.end(data);
                });
            }
        })
    }
    else if(req.url.toLowerCase() === "/jquery") {
        fs.access(jqueryFileName, (err) => {
            if(err) console.log(err);
            else {
                fs.readFile(fetchFileName, 'utf-8', (err, data) => {
                    resp.contentType = 'text/html';
                    resp.end(data);
                });
            }
        })
    }
    else{

    }
}).listen(PORT, "localhost", () => {
    console.log(`Listening on ${PORT} port...`);
})