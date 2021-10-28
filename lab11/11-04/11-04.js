const { WebSocketServer} = require('ws');
const PORT = 4000;
const wss = new WebSocketServer({ port: PORT });

let messageNumber = 1;

console.log(`WS is running on ${PORT} port...`);

wss.on('connection', (ws) => {
   ws.on('message', (data) => {
       let clientMessage = JSON.parse(data);

       console.log(clientMessage);

       ws.send(JSON.stringify({
           server: messageNumber++,
           client: clientMessage.client,
           timestamp: new Date().toLocaleString()
       }));
   });
});