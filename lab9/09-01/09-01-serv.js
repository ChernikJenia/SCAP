const http = require('http');
const PORT = 5000;

http.createServer((req, resp) => {

    resp.end('Hello');

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
