const { WebSocketServer, WebSocket} = require('ws');
const fs = require('fs');
const PORT = 4000;
const wss = new WebSocketServer({ port: PORT });

let pongCount = 0, n = 0;

console.log(`WS is running on ${PORT} port...`);

wss.on('connection', (ws) => {
    ws.on('pong', () => {
        pongCount++;
    });

    setInterval(() => {
        wss.clients.forEach(client => { client.ping() });
        console.log(`There are ${pongCount} living clients`);

        pongCount = 0;
    }, 5000);

    setInterval(() => {
        wss.clients.forEach(client => {
            client.send(`11-03-server: ${n}`);
        });
        n++;
    }, 15000);
});

