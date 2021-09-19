const http = require ('http');
const { stdin, stdout } = require('process');
const PORT = 5000;
const NORM = 'norm', STOP = 'stop', TEST = 'test', IDLE = 'idle', EXIT = 'exit';

http.createServer((req, resp) => {
    let currentState = NORM;


    stdout.write(`${currentState}->`);

    stdin.setEncoding('utf-8');
    stdin.on('readable', () => {
        let chunk = null;

        while((chunk = stdin.read()) !== null) {
            let newState = chunk.toLowerCase().trim();

            if(newState === EXIT) {
                process.exit(0);
            }
            else if([NORM, STOP, TEST, IDLE].indexOf(newState.toLowerCase()) !== -1 &&
                    newState !== currentState) {
                stdout.write(`reg = ${currentState}--> ${newState}\n`);
                currentState = newState;
            }
            else {
                stdout.write(chunk);
            }
            stdout.write(`${currentState}->`);
        }
    });



}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
