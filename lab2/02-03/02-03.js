const http = require('http');
const PORT = 5000;
const DATA = "Черник Евгений Сергеевич";

http.createServer((req, resp) => {
    resp.setHeader('Content-Type', "text/plain; charset=utf-8");

    if(req.method === "GET" && req.url.toLowerCase() === "/api/name") {
        resp.end(DATA);
    }
    else {
        resp.end("url is incorrect");
    }
}).listen(PORT, "localhost", () => {
    console.log(`Listening on ${PORT} port...`);
})