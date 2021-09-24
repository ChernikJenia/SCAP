const DB = require('../../lab4/04-01/db.js');
const { URL } = require('url');
const http = require('http');
const fs = require('fs');
const readline = require('readline');
const db = new DB.DB();
const path = './index.html';
const PORT = 5000;

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

let sdCommand;
let scCommand;
let ssCommand;
let requestsCount = 0;
let commitsCount = 0;
let startTime;
let finishTime;
let isStatisticsCollecting;

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

        console.log(objToUpdate);
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

db.on('commit', () => {
    db.commit();

    if(isStatisticsCollecting) {
        commitsCount++;
    }
});

rl.setPrompt('type command: ');
rl.on('line', command => {
    let commandAndArgs = command.toLowerCase().split(' ');

    let timeout = commandAndArgs[1] === undefined ? 0 : 1000 * Number(commandAndArgs[1]);

    switch (commandAndArgs[0]) {
        case 'sd':
            if (sdCommand !== undefined) {
                clearInterval(sdCommand);
            }
            if (commandAndArgs[1] !== undefined) {
                sdCommand = setTimeout(() => {
                    //server.close();
                    process.exit(0);
                }, timeout);

                sdCommand.unref();
            }
            break;
        case 'sc':
            if(scCommand !== undefined) {
                clearInterval(scCommand);
            }

            if(commandAndArgs[1] !== undefined) {
                scCommand = setInterval(() => {
                    db.emit('commit');
                }, timeout);

                scCommand.unref();
            }
            break;
        case 'ss':
            if(ssCommand !== undefined) {
                if(isStatisticsCollecting) {
                    console.log('======= Конец сбора статистики =======');
                }
                finishTime = new Date();
                isStatisticsCollecting = false;
                clearTimeout(ssCommand);
            }

            if(commandAndArgs[1] !== undefined) {
                console.log('======= Начало сбора статистики =======');

                startTime = new Date();
                commitsCount = 0;
                requestsCount = 0;
                isStatisticsCollecting = true;

                ssCommand = setTimeout(() => {
                    isStatisticsCollecting = false;
                    finishTime = new Date().toLocaleString();

                    console.log('======= Конец сбора статистики =======');
                }, timeout);

                ssCommand.unref();
            }
            break;
    }

    rl.prompt();
});


const server = http.createServer((req, resp) => {
    const url = new URL(`http://${req.headers["host"]}${req.url}`);

    rl.prompt();

    if(url.pathname === '/') {
        fs.access(path, fs.constants.R_OK, err => {
           if(err) throw err;

           fs.readFile(path, (e, data) => {
               if(err) throw e;

               resp.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
               resp.end(data);
           })
        });
    }
    else if(url.pathname === '/api/db') {
        db.emit(req.method, req, resp);
    }
    else if(url.pathname === '/api/ss') {
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({
            "start": startTime ? startTime.toLocaleString() : undefined,
            "finish": !isStatisticsCollecting && finishTime ? finishTime.toLocaleString() : undefined,
            "requests": requestsCount,
            "commits": commitsCount
        }));
    }
    if(isStatisticsCollecting) {
        requestsCount++;
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});



