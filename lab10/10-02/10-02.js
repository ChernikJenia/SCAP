const { WebSocket } = require('ws');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    let i = 0;

    console.log('connected');

    const interval = setInterval(() => {
        ws.send(`10-02-client: ${++i}`)
    }, 3000);

    setTimeout(() => {
        clearInterval(interval);
        ws.close();
    }, 25000);

});

ws.on('message', (message) => {
    console.log('%s', message);
});

ws.on('error', () => {
    console.log('failed to connect');
});

