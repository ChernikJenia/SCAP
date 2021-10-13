const http = require('http');
const xmlbuilder = require('xmlbuilder');
const { parseString } = require('xml2js');
const PORT = 5000;

http.createServer((req, resp) => {
    let body = '';
    let xmlRequest = null;

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        parseString(body, (err, result) => {
            xmlRequest = result;
        });

        let xmlObj = xmlbuilder.create('response');
        xmlObj.att('request', xmlRequest.request.$.id);

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

        resp.writeHead(200, { 'Content-Type' : 'application/xml' });
        resp.end(xmlResponse.toString());
    })
}).listen(PORT, () => {
    console.log(`Server is listening to ${PORT} port...`);
});
