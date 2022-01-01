const Pulpit = require("../model/pulpit");
const router = require('express').Router();

router.get('', (req, resp) => {
    console.log('here')
    Pulpit.find({}, (err, docs) => {
        if(err) resp.status(404).json({ error: 'Кафедры не найдены' });
        resp.status(200).json(docs);
    });
});

router.post('', (req, resp) => {
    const pulpit = new Pulpit(req.body);
    pulpit.save()
        .then(result => resp.status(201).json(result))
        .catch(err => resp.status(500).json({ err }));
});

router.put('', (req, resp) => {
    Pulpit.updateOne({ pulpit: req.body.pulpit }, req.body)
        .then(result => {
            if(result.modifiedCount > 0) {
                resp.status(201).json(result);
            } else {
                resp.status(404).json({ err : 'Кафедра не найдена' });
            }
        })
        .catch(err => resp.status(500).json({ err }));
});

router.delete('/:id', (req, resp) => {
    Pulpit.deleteOne({ _id: req.params.id })
        .then(result => {
            if(result.deletedCount > 0) {
                resp.status(200).json(result);
            } else {
                resp.status(404).json({ err : 'Кафедра не найдена' });
            }
        })
        .catch(err => resp.status(500).json({ err }));
});

module.exports = router;