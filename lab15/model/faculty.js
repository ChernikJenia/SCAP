const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    faculty: { type: String, required: true },
    faculty_name: { type: String, required: true },
});

module.exports = mongoose.model('Faculty', facultySchema);