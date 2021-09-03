const http = require('http');
const PORT = 3000;

http.createServer((req, resp) => {
    resp.end('<h1>Hello world</h1>');
}).listen(PORT, "localhost", () => {
    console.log(`Listening on ${PORT} port...`);
})