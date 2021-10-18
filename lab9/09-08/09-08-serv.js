const http = require('http');
const fs = require('fs');
const PORT = 5000;

http.createServer((req, resp) => {
    if(req.method === 'GET') {
        let header = null;
        let fileName = 'txt';

        switch (req.url) {
            case '/image':
                header = { "Content-Type" : "image/png" };
                fileName = '1.png';
                break;
            case '/json':
                header = { "Content-Type" : "application/json" };
                fileName = '1.json';
                break;
            case '/text':
                header = { "Content-Type" : "text/plain" };
                fileName = '1.txt';
            default:
                header = { "Content-Type" : "text/plain" };
                fileName = 'error.txt';
                break
        }
        resp.writeHead(200, header);

        fs.createReadStream(fileName).pipe(resp);
    }

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});