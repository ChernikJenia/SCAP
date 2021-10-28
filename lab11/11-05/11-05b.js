const { Client } = require('rpc-websockets');
const async = require('async');

const ws = new Client('ws://localhost:4000');
const lp = { login: 'scott', password: 'tiger' };

const rpcCall = (callback, method, params) => {
    ws.call(method, params)
       .then(r => callback(null, r))
       .catch(err => callback(err, null));
}
const rpcLogin = (callback, loginParams, method, params) => {
   ws.login(loginParams)
       .then(login => {
          if(login)
             rpcCall(callback, method, params)
          else
             callback('login error', null);
       });
}

const callback = () => async.parallel([
       (cb) => rpcCall(cb, 'square', [ 3 ]),
       (cb) => rpcCall(cb, 'square', [ 5, 4 ]),
       (cb) => rpcCall(cb, 'sum', [ 2 ]),
       (cb) => rpcCall(cb, 'sum', [ 2, 4, 6, 8, 10 ]),
       (cb) => rpcCall(cb, 'mul', [ 3 ]),
       (cb) => rpcCall(cb, 'mul', [ 3, 5, 7, 9, 11, 13 ]),

       (cb) => rpcLogin(cb, lp, 'fib', [ 1 ]),
       (cb) => rpcLogin(cb, lp, 'fib', [ 2 ]),
       (cb) => rpcLogin(cb, lp, 'fib', [ 7 ]),
       (cb) => rpcLogin(cb, lp, 'fib', [ 0 ]),
       (cb) => rpcLogin(cb, lp, 'fib', [ 5 ]),
       (cb) => rpcLogin(cb, lp, 'fib', [ 10 ]),
    ],

   (err, results) => {
      console.log(err ?? results);
      ws.close();
   }
);

ws.on('open', callback);
ws.on('error', () => console.log('Connection error'));
