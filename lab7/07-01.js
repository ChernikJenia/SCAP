const MAIN_DIR = './static';
const PORT = 5000;

const http = require('http');
const SF = require('./m07-01');
const sf = new SF.SF(MAIN_DIR);

const httpHandler = (req, resp) => {
    if(req.method === 'GET') {
        if(sf.isStatic('html', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "text/html" });
        else if(sf.isStatic('css', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "text/css" });
        else if(sf.isStatic('js', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "text/javascript" });
        else if(sf.isStatic('docx', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "application/msword" });
        else if(sf.isStatic('json', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "application/json" });
        else if(sf.isStatic('xml', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "application/xml" });
        else if(sf.isStatic('[png|jpg|jpeg|bmp]', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "image/png" });
        else if(sf.isStatic('mp4', req.url))
            sf.sendFile(req, resp, { "Content-Type" : "video/mp4" });
        else
            sf.HTTP_404(req, resp);
    }
    else {
        sf.HTTP_405(req, resp);
    }
}

http.createServer()
    .listen(PORT, () => console.log(`Server is listening to ${PORT} port...`))
    .on('error', (err) => console.log(`An error has occurred: ${err.code}`))
    .on('request', httpHandler);