const { Client } = require('rpc-websockets');

const ws = new Client('ws://localhost:4000');

ws.on('open', () => {
   ws.subscribe('A');

   ws.on('A', () => {
      console.log('Event A has been happened on the server');
   });
});