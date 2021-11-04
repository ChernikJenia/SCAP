const fs = require('fs');
const { STUDENT_FILE } = require('./constants');
const { writeSuccess, writeError } = require('./writeError');

const getHandler = (req, resp) => {
    if(req.url === '/') {
        getStudents(resp);
    }
    else if(req.url.match('^/[0-9]+$')) {
        getStudentById(resp, req.url.split('/')[1]);
    }
    else if(req.url === '/backup') {
        getBackups(resp);
    }
    else {

    }
}

const getBackups = (resp) => {
    fs.readdir('./files', (err, files) => {
        writeSuccess(JSON.stringify(files.filter(f => f !== STUDENT_FILE)), resp);
    });
}

const getStudentById = (resp, id) => {

    fs.readFile(`./files/${STUDENT_FILE}`,  (err, data) => {
        if(!err) {
            let students = JSON.parse(data);
            let student = students
                .find(s => s.id == id);

            if(student) {
                writeSuccess(JSON.stringify(student), resp);
            }
            else {
                writeError(
                    2,
                    404,
                    `студент с id ${id} не найден`, resp);
            }
        }
    });
};


const getStudents = (resp) => {
    fs.readFile(`./files/${STUDENT_FILE}`, (err, data) => {
        if(err) {
            writeError(
                1,
                404,
                `ошибка чтения файла ${STUDENT_FILE}`,
                resp);
        }
        else {
            writeSuccess(data, resp);
        }
    });
}

module.exports.getHandler = getHandler;