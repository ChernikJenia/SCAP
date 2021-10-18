const http = require('http');
const { WebSocketServer } = require('ws');
const { createReadStream } = require('fs');
const HTTP_PORT = 3000;
const WS_PORT = 4000;
let serverMsgCount = 0;

const server = http.createServer((req, resp) => {
    if(req.method === 'GET' && req.url === '/start') {
        createReadStream('./start.html', 'utf-8').pipe(resp);
    }
    else {
        resp.statusCode = 400;
        resp.end('<h1>Bad request</h1>');
    }
}).listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', (ws, req) => {
    let clientMsgCount = 0;

    console.log(`Client ${req.socket.remoteAddress} connected`);

    ws.on('message', message => {
        clientMsgCount = message.toString().split(' ')[1];

        console.log(`Message from client: ${message}`);
    });

    setInterval(() => {
        ws.send(`10-01-server: ${clientMsgCount}->${++serverMsgCount}`);
    }, 5000);

    ws.on('close', () => {
        console.log(`Client ${req.socket.remoteAddress} disconnected`);
    });
});