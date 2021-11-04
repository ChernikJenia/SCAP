const http = require('http');

const { getHandler } = require('./getHandler');
const { postHandler } = require('./postHandler');
const { putHandler } = require('./putHandler');
const { deleteHandler } = require('./deleteHandler');
const { writeError } = require('./writeError');
const { Server } = require('rpc-websockets');
const HTTP_PORT = 5000;
const WS_PORT = 4000;
const fs = require('fs');

const requestHandler = (req, resp) => {
    switch (req.method) {
        case 'GET':
            getHandler(req, resp);
            break;
        case 'POST':
            postHandler(req, resp);
            break;
        case 'PUT':
            putHandler(req, resp);
            break;
        case "DELETE":
            deleteHandler(req, resp);
            break;
        default:
            writeError(
                6,
                405,
                'метод не разрешён',
                resp);
            break;

    }
};

const server = http.createServer(requestHandler);
const wss = new Server({
    port: WS_PORT,
    host: 'localhost'
});

server.listen(HTTP_PORT, () => {
    console.log(`Server is listening to ${HTTP_PORT} port...`);
});

wss.event('file_changed');

fs.watch('./files', (eventType, file) => {
    wss.emit('file_changed', file);
    console.log(`${file} : ${eventType}`);
});