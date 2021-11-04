const fs = require('fs');
const { STUDENT_FILE } = require('./constants');
const { writeSuccess, writeError } = require('./writeError');

const deleteStudent = (id, resp) => {
    fs.readFile(`./files/${STUDENT_FILE}`, (err, data) => {
       let students = JSON.parse(data);
       let removableStudent = students.find(st => st.id == id);

       if(removableStudent !== undefined) {
           students = students.filter(st => st != removableStudent);

           fs.writeFileSync(`./files/${STUDENT_FILE}`, JSON.stringify(students));
           writeSuccess(JSON.stringify(removableStudent), resp)
       }
       else {
           writeError(
               2,
               404,
               `студент с id ${id} не найден`,
               resp);
       }
    });
}

const deleteBackups = (req, resp) => {
    const [ _, year, month, day ] = req.url.match(/^\/backup\/(\d{4})(\d{2})(\d{2})$/);

    fs.readdir('./files', (err, files) => {
        const deletedFiles = [];

        files.forEach(file => {
            const fDate = file.match(/^(\d{4})(\d{2})(\d{2})/);

            if(fDate) {
                const [_, fYear, fMonth, fDay] = fDate;

                if(new Date(year, month, day) < new Date(fYear, fMonth, fDay)) {
                    fs.unlinkSync(`./files/${file}`);
                    deletedFiles.push(file);
                }
            }
        });
        writeSuccess(JSON.stringify(deletedFiles), resp);
    });
}

const deleteHandler = (req, resp) => {
    if(req.url.match('^/[0-9]+$')) {
        deleteStudent(req.url.split('/')[1], resp);
    }
    else if(req.url.startsWith('/backup')) {
        deleteBackups(req, resp);
    }
};

module.exports.deleteHandler = deleteHandler;