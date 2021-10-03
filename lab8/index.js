const http = require("http");
const { URL } = require("url");
const PORT = 5000;
const server = http.createServer();


const getHandler = (req, resp) => {
    let url = new URL(`http://${req.headers["host"]}${req.url}`);
    let params = url.pathname.split(/(?<=.+)\//);

    switch (params[0]) {
        case "/connection":
            let param = parseInt(url.searchParams.get("set"));

            if(param) {
                server.keepAliveTimeout = param;
                resp.end(`keepAliveTimeout has been changed to ${param}`);
            }
            else {
                resp.end(`keepAliveTimeout: ${server.keepAliveTimeout}`);
            }
            break;
        case "/headers":
            resp.setHeader("MyHeader", "hey ho");
            resp.end(createHeaders(req,resp));
            break;
        case "/parameter":
            let x, y;

            if(params[1] || params[2]) {
                x = parseInt(params[1]);
                y = parseInt(params[2]);
            }
            else {
                x = parseInt(url.searchParams.get('x'));
                y = parseInt(url.searchParams.get('y'));
            }

            if(x && y) {
                resp.write(`x + y = ${x + y}\n`);
                resp.write(`x - y = ${x - y}\n`);
                resp.write(`x * y = ${x * y}\n`);
                resp.write(`x / y = ${x / y}\n`);
                resp.end();
            }
            else if(params[1]) {
                resp.end(url.href);
            }
            else {
                resp.writeHead(400, "Bad request");
                resp.end("x, y must be numbers");
            }
            break;
        case "/close" :
            resp.end("Server closes in 10 seconds...");
            setTimeout(() => server.close(), 10000);
            break;
        case "/socket":
            let con = req.connection;

            resp.write(`client: ${con.remoteAddress || req.headers["x-forwarded-for"]}:${con.remotePort}\n`);
            resp.write(`server: ${con.localAddress}:${con.localPort}\n`);
            resp.end();
            break;
            // TODO: 7 - 14
        case "/req-data":
            break;
    }
};

const createHeaders = (req, resp) => {
    let headers = "";

    headers = "<table border='1'>" +
        "<tr><th colspan='2'>Request</th> </tr>";

    for(let key in req.headers) {
        headers += `<tr><td>${key}</td> <td>${req.headers[key]}</td>`;
    }

    headers += "<tr><th colspan='2'>Response</th> </tr>";

    // TODO : чек заголовки ответа
    console.log(resp.getHeader('MyHeader'));

    for(let key in resp.headers) {
        headers += `<tr><td>${key}</td> <td>${resp.headers[key]}</td>`;
    }

    headers += "</table>";

    return headers;
}

const postHandler = (req, resp) => {

};

const httpHandler = (req, resp) => {

    switch(req.method) {
        case "GET":
            getHandler(req, resp);
            break;
        case "POST":
            postHandler(req, resp);
            break;
        default:
            break;
    }
}

server
    .listen(PORT, () => console.log(`Server is listening to ${PORT} port...`))
    .on("request", httpHandler)
    .on("error", (err) => console.log("Error:", err));
