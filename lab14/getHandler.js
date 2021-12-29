const sql = require('./db');

const getAll = async (res, table) => {
    let result = await sql.getAll(table);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end(JSON.stringify(result.recordset));
};

module.exports = (req, resp) => {
    if(req.url === '/') {
        resp.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        resp.end(require("fs").readFileSync("./14-01.html"));
    } else if(req.url === '/api/faculties') {
        getAll(resp, 'faculty')
    } else if(req.url === '/api/pulpits') {
        getAll(resp, 'pulpit')     
    } else if(req.url === '/api/subjects') {
        getAll(resp, 'subj')
    } else if(req.url === '/api/auditoriumstypes') {
        getAll(resp, 'auditorium_types')
    } else if(req.url === '/api/auditoriums') {
        getAll(resp, 'auditorium')
    } else {
        resp.writeHead(400, 'Bad request');
        resp.end(JSON.stringify({ error: 'Bad request' }));
    }
};
