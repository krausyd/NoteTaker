let notes = require('../../db/db');
const router = require('express').Router();
const Note = require('../../lib/Note');

router.get('/notes', (_, res) => {
    console.log('GET /notes')
    res.json(notes);
});

router.post('/notes', (req, res) => {
    console.log('POST /notes')
    const note = new Note(req.body.title, req.body.text);
    if (note.validateNote()) {
        notes = note.addNote(notes);
        res.json(note);
    } else {
        res.sendStatus(400);
    }
});

router.put('/notes/:id', (req, res) => {
    console.log(`PUT /notes/${req.params.id}`);
    const note = notes.filter(i => i.id === req.paramsid);
    if (note) {
        note.text = req.body.text;
        note.title = req.body.title;
        if (!note.validateNote()) { 
            res.sendStatus(400);
        }
        if (note.updateNote(notes)) {
            res.json(note);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

router.delete('/notes/:id', (req, res) => {
    console.log(`DELETE /notes/${req.params.id}`);
    notes = Note.deleteNote(req.params.id, notes);
    res.sendStatus(200);
});

module.exports = router;