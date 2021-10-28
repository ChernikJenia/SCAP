const { Client } = require('rpc-websockets');
const async = require('async');

const ws = new Client('ws://localhost:4000');
const lp = { login: 'scott', password: 'tiger' };

const callback = () => {
    ws.login(lp)
        .then(login => {
            if(login) {
                return  async.waterfall([
                    (cb) =>
                        Promise.all([
                            ws.call('fib', [ 7 ]),
                            ws.call('mul', [ 2, 4, 6 ])
                        ]).then(data => cb(null, [ ...data[0], data[1] ]))
                            .catch(err => cb(err, null)),
                    (args, cb) =>
                        ws.call('mul', args)
                            .then(data => cb(null, data))
                            .catch(err => cb(err, null)),
                    (args, cb) =>
                        Promise.all([
                            ws.call('square', [ 3 ]),
                            ws.call('square', [ 5, 4 ]),
                            ws.call('mul', [ 3, 5, 7, 9, 11, 13 ])
                        ]).then(data => cb(null, [ args, ...data ]))
                            .catch(err => cb(err, null)),
                    (args, cb) =>
                        ws.call('sum', args)
                            .then(data => cb(null, data))
                            .catch(err => cb(err, null)),

                    (err, results) => {
                        console.log(err ?? results);
                        ws.close();
                    }
                ])
            }
        })

}


ws.on('open', callback);
ws.on('error', () => console.log('Connection error'));