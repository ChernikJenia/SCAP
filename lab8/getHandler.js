const {URL} = require("url");
const fs = require("fs");
const STATIC_DIR = "./static/files";
const SF = require("../lab7/m07-01");
const sf = new SF.SF(STATIC_DIR);
const fileName = "./formparameter.html";


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

module.exports.getHandler = (req, resp, server) => {
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
        case "/req-data":
            let chunkCount = 0;
            req.on('data', chunk => {
                console.log(`chunk ${++chunkCount}`);
            })
            break;
        case "/resp-status":
            let code = url.searchParams.get('code');
            let mess = url.searchParams.get('mess');

            if(code && mess) {
                resp.statusCode = code;
                resp.statusMessage = mess;

                resp.end();
            }
            break;
        case "/formparameter":
            fs.createReadStream(fileName).pipe(resp);
            break;
        case "/files":

            if(params[1]) {
                let filePath = `\/${params[1]}`;

                if(req.method === 'GET') {
                    if(sf.isStatic('html', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "text/html" });
                    else if(sf.isStatic('css', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "text/css" });
                    else if(sf.isStatic('js', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "text/javascript" });
                    else if(sf.isStatic('docx', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "application/msword" });
                    else if(sf.isStatic('json', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "application/json" });
                    else if(sf.isStatic('xml', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "application/xml" });
                    else if(sf.isStatic('[png|jpg|jpeg|bmp]', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "image/png" });
                    else if(sf.isStatic('mp4', filePath))
                        sf.sendFile(req, resp, { "Content-Type" : "video/mp4" });
                    else
                        sf.HTTP_404(req, resp);
                }
                else {
                    sf.HTTP_405(req, resp);
                }
            }
            else {
                fs.readdir(STATIC_DIR, (err, files) => {
                    resp.writeHead(200, { "X-Static-files-count": files.length });
                    resp.end();
                });
            }
            break;
        case "/upload":
            fs.createReadStream('./upload.html').pipe(resp);
            break;
        default:
            resp.writeHead(400, "Bad request");
            resp.end("Error 400: Bad request");
            break;
    }
};