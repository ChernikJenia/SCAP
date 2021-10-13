const http = require('http');
const xmlbuilder = require('xmlbuilder');
const { parseString } = require('xml2js');

const options = {
    host: 'localhost',
    port: 5000,
    method: 'POST',
    path: '/api',
    headers: {'Content-Type': 'application/xml'}
};

const callback = resp => {
    let data = '';

    resp.on('data', chunk => {
        data += chunk;
    })

    resp.on('end', () => {
      // TODO: парсинг xml


    })
};

const xmlMessage =
    '<request id="28">' +
        '<x value = "1"/>' +
        '<x value = "2"/>' +
        '<m value = "a"/>' +
        '<m value = "b"/>' +
        '<m value = "c"/>' +
    '</request>';

const req = http.request(options, callback);

req.on('error', () => console.log('failed to request'));
req.write();
req.end();