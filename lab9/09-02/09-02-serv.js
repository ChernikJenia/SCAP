const http = require('http');
const url = require('url');
const PORT = 5000;

http.createServer((req, resp) => {
    let f = url.parse(req.url, true);
    let params = f.query;

    resp.end(`x=${params.x}, y=${params.y}`);

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
