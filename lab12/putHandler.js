const fs = require('fs');
const fsPromises = fs.promises;
const { STUDENT_FILE } = require('./constants');
const { writeSuccess, writeError } = require('./writeError');

const checkStudents = async (body, resp) => {
    let jsonBody = JSON.parse(body);

    let students = await fsPromises.readFile(`./files/${STUDENT_FILE}`);
    let jsonStudents = JSON.parse(students);

    let index = jsonStudents.findIndex(st => st.id === jsonBody.id);

    if (index !== -1) {
        for(let prop in jsonBody) {
            jsonStudents[index][prop] = jsonBody[prop];
        }

        await fsPromises
            .writeFile(`./files/${STUDENT_FILE}`, JSON.stringify(jsonStudents));

        writeSuccess(body, resp);
    } else {
        writeError(
            2,
            404,
            `студент с id ${jsonBody.id} не найден`, resp);
    }
}

const putHandler = (req, resp) => {
    if(req.url === '/') {
        let body = '';

        req.on('data', (chunk) => {
           body += chunk;
        });

        req.on('end', () => checkStudents(body, resp));
    }
};


module.exports.putHandler = putHandler;