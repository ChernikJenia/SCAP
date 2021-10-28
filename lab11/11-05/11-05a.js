const { Client } = require('rpc-websockets');

const ws = new Client('ws://localhost:4000');
const loginParams = { login: 'scott', password: 'tiger' };

// sum( square(3), square(5,4), mul(3,5,7,9,11,13) ) + ( fib(7) * mul(2,4,6) )
ws.on('open', () => {
    Promise.all([
        ws.call('square', [ 3 ]),
        ws.call('square', [ 5, 4 ]),
        ws.call('sum', [ 2 ]),
        ws.call('sum', [ 2, 4, 6, 8, 10 ]),
        ws.call('mul', [ 3 ]),
        ws.call('mul', [ 3, 5, 7, 9, 11, 13 ])
    ]).then(data => console.log(data))
      .catch(err => console.log(err));

    ws.login(loginParams)
        .then(login => {
             if(login) {
                 Promise.all([
                     ws.call('fib', [ 1 ]),
                     ws.call('fib', [ 2 ]),
                     ws.call('fib', [ 7 ]),
                     ws.call('fact', [ 0 ]),
                     ws.call('fact', [ 5 ]),
                     ws.call('fact', [ 10 ])
                 ]).then(data => console.log(data))
                   .catch(err => console.log(err));
             }
             else {
                 console.log('login error');
             }
        });
});