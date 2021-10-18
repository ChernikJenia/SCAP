const { WebSocketServer, WebSocket } = require('ws');

const PORT = 4000;
const server = new WebSocketServer({ port: PORT });
let counter = 0;

server.on('connection', (ws, req) => {

    setInterval(() => {
        if(server.clients.size > 0) {
            server.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(`Hello everybody ${counter}`);
                }
            });
            counter++;
        }
        else {
            console.log('no one came to the party');
        }
    }, 3000);
});

