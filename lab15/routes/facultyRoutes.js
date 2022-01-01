const Faculty = require("../model/faculty");
const router = require('express').Router();

router.get('', (req, resp) => {
    console.log('here')
    Faculty.find({}, (err, docs) => {
        if(err) resp.status(404).json({ error: 'Факультеты не найдены' });
        else resp.status(200).json(docs);
    });
});

router.post('', (req, resp) => {
    const faculty = new Faculty(req.body);
    faculty.save()
        .then(result => resp.status(201).json(result))
        .catch(err => resp.status(500).json({ err }));
});

router.put('', (req, resp) => {
    Faculty.updateOne({ faculty: req.body.faculty }, req.body)
        .then(result => {
            if(result.modifiedCount > 0) {
                resp.status(201).json(result);
            } else {
                resp.status(404).json({ err : 'Факультет не найден' });
            }
        })
        .catch(err => resp.status(500).json({ err }));
});

router.delete('/:id', (req, resp) => {
    Faculty.deleteOne({ _id: req.params.id })
        .then(result => {
            if(result.deletedCount > 0) {
                resp.status(200).json(result);
            } else {
                resp.status(404).json({ err : 'Факультет не найден' });
            }
        })
        .catch(err => resp.status(500).json({ err }));
});

module.exports = router;