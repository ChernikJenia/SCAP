const express = require('express')
const fs = require('fs');
const http = require('http');
const PORT = 5000;
const fileName = './index.html';
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
const { send } = require('./m0603/m0603');

app.get("/", (req, resp) => {
    fs.access(fileName,  fs.constants.R_OK, (err) => {
        if(err) throw err;

        fs.readFile(fileName, 'utf-8', (err, data) => {
            resp.writeHead(200, { "Content-Type": "text/html" });
            resp.end(data);
        });
    });
});

app.post("/send", urlencodedParser, (req, resp) => {
    send(req.body.message)
        .then(result => resp.end(result.response));
});

app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
})

