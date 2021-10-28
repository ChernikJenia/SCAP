const { WebSocketServer, WebSocket} = require('ws');
const fs = require('fs');

const PORT = 4000;

const wss = new WebSocketServer({ port: PORT });

console.log(`WS is running on ${PORT} port...`);

wss.on('connection', (ws) => {
   const wsStream = WebSocket.createWebSocketStream(ws, { encoding: 'utf-8' });
   const fileStream = fs.createWriteStream('./upload/result.txt', 'utf-8');

   wsStream.pipe(fileStream);
});