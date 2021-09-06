const http = require('http');
const fs = require('fs');
const PORT = 5000;
const fileName = "./1.png";

http.createServer((req, resp) => {
    if(req.method === "GET" && req.url.toLowerCase() === "/png"){
        fs.stat(fileName, (err, stat) => {
            if(err) console.log(err);
            else {
                fs.readFile(fileName, 'utf-8',(err, data) => {
                   resp.contentType = 'image/png';
                   resp.content.length = stat.size;
                   resp.end(data, 'binary');
                });
            }
        });
    }
    else {
        resp.end("incorrect url");
    }

}).listen(PORT, "localhost", () => {
    console.log(`Server is litening on ${PORT} port...`);
});


