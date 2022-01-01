const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pulpitSchema = new Schema({
    pulpit: { type: String, required: true },
    pulpit_name: { type: String, required: true },
    faculty: { type: String, required: true }
});
const Pulpit = mongoose.model('Pulpit', pulpitSchema);

module.exports = Pulpit;