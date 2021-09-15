const http = require('http');
const fs = require('fs');
const PORT = 5000;
const fileName = "./02-01/index.html";

http.createServer((req, resp) => {

    if(req.url.toLowerCase() === "/html") {
        fs.stat(fileName, (err, stats) => {
            if(err) console.log(err);
            else{
                const html = fs.readFileSync(fileName, "utf-8");

                resp.writeHead(200, {'Content-Type': "text/html; charset=utf-8"});
                resp.end(html);
            }
        });
    }
    else {
        resp.end("url is incorrect");
    }
}).listen(PORT, "localhost", () => {
    console.log(`Server is litening on ${PORT} port...`);
});


