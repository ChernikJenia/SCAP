const http = require('http');
const PORT = 5000;

http.createServer((req, resp) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        let b = JSON.parse(body);

        let jsonAnswer = {
            "_comment" : b._comment,
            "x_plus" : b.x + b.y,
            "Concatenation_s_o" : `${b.s}: ${b.o.surname}, ${b.o.name}` ,
            "Length_m" :  b.m.length
        }

        resp.writeHead(200, {'Content-Type': 'application/json'});
        resp.end(JSON.stringify(jsonAnswer));
    })


}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
