const express = require('express')
const sendmail = require('sendmail')({silent: true});
const fs = require('fs');
const http = require('http');
const PORT = 5000;
const fileName = './index.html';
const app = express();
const urlencodedParser = express.urlencoded({extended: false});


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
    sendmail({
       from: req.body.from,
       to: req.body.to,
       subject: req.body.message
    }, (err, reply) => {
        console.log(err && err.stack)
        console.dir(reply)
    });
    console.log("ok");
    //resp.end("ok");
});

app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
})

