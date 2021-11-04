const fs = require("fs");
const fsPromises = fs.promises;
const { STUDENT_FILE } = require('./constants');
const { writeSuccess, writeError } = require('./writeError');

const checkStudents = async (body, resp) => {
    let jsonBody = JSON.parse(body);

    let students = await fsPromises.readFile(`./files/${STUDENT_FILE}`);
    let jsonStudents = JSON.parse(students);

    if (jsonStudents.findIndex(st => st.id === jsonBody.id) === -1) {
        jsonStudents.push(jsonBody);
        await fsPromises
            .writeFile(`./files/${STUDENT_FILE}`, JSON.stringify(jsonStudents));

        writeSuccess(body, resp);
    } else {
        writeError(
            3,
            500,
            `студент с id ${jsonBody.id} уже есть`,
            resp
        );
    }
};

const postHandler = (req, resp) => {
    if(req.url === '/') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => checkStudents(body, resp));

    }
    else if(req.url === '/backup') {
        const date = new Date();
        const [ hh, minutes, s ] = date.toTimeString()
            .split(' ')[0]
            .split(':');

        const [ dd, month, yyyy ] = date.toLocaleDateString().split('.');

        setTimeout(() => {
            let backupFileName = `./files/${yyyy}${month}${dd}${hh}${minutes}_${STUDENT_FILE}`;

            fs.copyFile(`./files/${STUDENT_FILE}`, backupFileName, (err) => {
                if(err) {
                    writeError(
                        4,
                        500,
                        `ошибка копирования файла ${STUDENT_FILE}`,
                        resp);
                }
                else {
                    writeSuccess(backupFileName, resp);
                }
            });
        }, 2000);
    }
};

module.exports.postHandler = postHandler;