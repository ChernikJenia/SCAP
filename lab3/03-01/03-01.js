const http = require ('http');
const { stdin, stdout } = require('process');
const PORT = 5000;
let state = 'norm';

http.createServer((req, resp) => {
    resp.end(`<h1>${state}</h1>`);

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
