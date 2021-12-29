const http = require('http');
const PORT = 3000;
const getHandler = require('./getHandler');
const postHandler = require('./postHandler');
const putHandler = require('./putHandler');
const deleteHandler = require('./deleteHandler');

const server = http.createServer((req, resp) => {
    switch(req.method) {
        case 'GET':
            getHandler(req, resp);
            break;
        case 'POST':
            postHandler(req, resp);
            break;
        case 'PUT':
            putHandler(req, resp);
            break;
        case 'DELETE':
            deleteHandler(req, resp);
            break;
        default:
            break;
    }
});

server.listen(PORT, () => console.log(`Server is listening to ${PORT} port...`));