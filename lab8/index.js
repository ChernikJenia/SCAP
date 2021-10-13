const PORT = 5000;
const http = require("http");
const { getHandler } = require('./getHandler');
const { postHandler } = require('./postHandler');
const server = http.createServer();

const httpHandler = (req, resp) => {
    switch(req.method) {
        case "GET":
            getHandler(req, resp, server);
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
