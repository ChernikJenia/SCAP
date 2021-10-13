const mp = require("multiparty");
const {URL} = require("url");
const {parseString} = require("xml2js");
const STATIC_DIR = "./static";
const xmlBuilder = require("xmlbuilder");

module.exports.postHandler = (req, resp) => {
    if(req.url === "/upload") {
        let form = new mp.Form({ uploadDir: `${STATIC_DIR}/files` });

        form.parse(req, function(err, fields, file){
            if (err) {
                resp.writeHead(400, {'content-type': 'text/plain'});
                resp.end("invalid request: " + err.message);
                return;
            }
            resp.end('uploaded successfully');
        });
        return;
    }

    let url;
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        url = new URL(`http://${req.headers["host"]}${req.url}?${body}`);

        switch (url.pathname) {
            case "/formparameter":
                let result = '';

                for(const [key, value] of url.searchParams.entries()) {
                    result += `<span>${key} : ${value}</span> </br>`;
                }
                resp.writeHead(200, { "Content-Type": "text/html" });
                resp.end(result);
                break;
            case "/json":
                let b = JSON.parse(body);

                resp.writeHead(200, { "Content-Type": "application/xml" });

                resp.end(JSON.stringify({
                    "_comment" : b._comment,
                    "x_plus" : b.x + b.y,
                    "Concatenation_s_o" : `${b.s}: ${b.o.surname}, ${b.o.name}` ,
                    "Length_m" :  b.m.length
                }, null , '\t'));
                break;
            case "/xml":
                let xmlRequest = null;

                parseString(body, (err, result) => {
                    xmlRequest = result;
                    console.log(err ?? result);
                });

                let xmlObj = xmlBuilder.create("response");
                xmlObj.att("request", xmlRequest.request.$.id);

                let sum = 0;
                xmlRequest.request.x.map(el => sum += Number(el.$.value));

                let sumElem = xmlObj.ele('sum');
                sumElem.att("element", "x")
                    .att("result", sum);

                let concatStr = "";
                xmlRequest.request.m.map(el => concatStr += el.$.value);

                let concat = xmlObj.ele('m');
                concat.att("element", "m")
                    .att("result", concatStr);

                let xmlResponse = xmlObj.end({ pretty: true });
                resp.end(xmlResponse.toString());
                break;
            default:
                break;
        }
    });
};