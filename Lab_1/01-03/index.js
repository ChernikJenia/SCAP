const http = require('http');
const PORT = 3000;

http.createServer((req, resp) => {
    if(req.method == "GET"){
        resp.write('<h1>Properties: </h1>')
        resp.write("<table border='2'>");
    
        for(let prop in req){
            if(typeof(req[prop]) == "string" || typeof(req[prop]) == "number")
                resp.write(`<tr><td>${prop}</td><td>${req[prop]}</td></tr>`);
        }
    
        resp.end('</table>')
    }
    else if(req.method == "POST"){
        let data = "";

        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            resp.end(`Вы отправили: ${data}`);    
        });
        
    }
    
}).listen(PORT, "localhost", () => {
    console.log(`Listening on ${PORT} port...`);
})