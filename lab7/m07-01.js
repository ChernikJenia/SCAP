const fs = require("fs");

class StaticFiles {
    constructor(staticPath) {
        this.staticPath = staticPath;
    }

    createPath = (fileName) => this.staticPath + fileName;

    isStatic =  (ext, fileName) => {
        let reg = new RegExp(`^\/.+\.${ext}$`);
        return reg.test(fileName);
    };

    sendFile = (req, resp, headers) => {
        let fileName = this.createPath(req.url);

        fs.access(fileName, (err) => {
            if(err) {
                this.HTTP_404(req, resp);
            }
            else {
                resp.writeHead(200, headers);
                fs.createReadStream(fileName).pipe(resp);
            }
        });
    };

    HTTP_405 = (req, resp) => {
        resp.writeHead(405, { "Content-Type":"text/html"});
        resp.end("<h1>Error 405: Method not allowed</h1>");
    };

    HTTP_404 = (req, resp) => {
        resp.writeHead(404, { "Content-Type": "text/html" });
        resp.end("<h1>Error 404: Resource not found</h1>");
    };
}

module.exports.SF = StaticFiles;
