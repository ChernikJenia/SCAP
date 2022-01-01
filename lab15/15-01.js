require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const facultyRoutes = require('./routes/facultyRoutes');
const pulpitRoutes = require('./routes/PulpitRoutes');

const connectionString =
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ehiis.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`

mongoose.connect(connectionString)
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/api/faculties', facultyRoutes);
app.use('/api/pulpits', pulpitRoutes);

app.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
