const http = require('http');
const fs = require('fs');
const PORT = 5000;
const fileName = "../02-02/1.png";

http.createServer((req, resp) => {
    if(req.method === "GET" && req.url.toLowerCase() === "/png"){
        fs.stat(fileName, (err, stat) => {
            if(err) console.log(err);
            else {
                fs.readFile(fileName,(err, data) => {
                   resp.writeHead(200, {"Content-Type" : "image/jpeg", "Content-Length" : stat.size});
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


