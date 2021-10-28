const { Server } = require('rpc-websockets');
const PORT = 4000;
const wss = new Server({ port: PORT, host: 'localhost' });

const users = [
    { login: "admin", password: "admin" },
    { login: "scott", password: "tiger" },
    { login: "sanya", password: "1234" }
];

wss.setAuth(auth => users.find(el =>
    el.login === auth.login && el.password === auth.password) !== undefined);

wss.register('square', (args) => {
    return args.length === 1 ? Math.PI * Math.pow(args[0], 2) : args[0] * args[1];
}).public();

wss.register('sum', (args) => {
    return args.reduce((prev, curr) => prev + curr);
}).public();

wss.register('mul', (args) => {
    return args.reduce((prev, curr) => prev * curr);
}).public();

wss.register('fib', (args) => {
    return fib(args[0]);
}).protected();

wss.register('fact', (args) => {
    return fact(args[0]);
}).protected();


function fib(n, arr =  [0, 1]) {
    return n === 0 ? arr : fib(n - 1, [...arr, arr[arr.length - 1] + arr[arr.length - 2]]);
}

function fact(n) {
    return n <= 0 ? 1 : n * fact(n - 1);
}