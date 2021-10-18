const http = require('http');
const fs = require('fs');
const PORT = 5000;

http.createServer((req, resp) => {
    let writeStream = fs.createWriteStream('./1.txt', 'utf-8');
    req.pipe(writeStream);

    req.on('end', () => {
        resp.end('thanks for sending the file');
    });

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});