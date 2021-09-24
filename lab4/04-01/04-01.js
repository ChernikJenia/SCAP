const DB = require('./db.js');
const { URL } = require('url');
const http = require('http');
const PORT = 5000;
const db = new DB.DB();

db.on('GET', (req, resp) => {
    resp.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8'});
    resp.end(db.select());
});

db.on('POST',  (req, resp) => {
    req.on('data', data => {
        let newObj = String(data);
        db.insert(JSON.parse(newObj));

        resp.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8'});
        resp.end(newObj);
    });
});

db.on('PUT', (req, resp) => {
    req.on('data', data => {
        let objToUpdate = String(data);

        db.update(JSON.parse(objToUpdate));
        resp.end();
    });
});

db.on('DELETE', (req, resp) => {
    const url = new URL(`http://${req.headers["host"]}${req.url}`);
    let id = url.searchParams.get('id');

    if(id != null) {
        db.delete(+id);
    }

    resp.end();
});


http.createServer((req, resp) => {
    const url = new URL(`http://${req.headers["host"]}${req.url}`);

    if(url.pathname === '/api/db') {
        db.emit(req.method, req, resp);
    }

}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
})
