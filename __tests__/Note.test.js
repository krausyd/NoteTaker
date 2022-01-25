const Note = require('../lib/Note');
const fs = require('fs');
jest.mock('fs');

test('creates a new note with an uuid', () => {
    const note = new Note('title', 'text');

    expect(note.id).toBeDefined();
    expect(note.title).toBe('title');
    expect(note.text).toBe('text');
});

test('adds a new note to an empty array', () => {
    const newNote = new Note('title', 'text');
    expect(newNote.addNote([])).toContain(newNote);
});

test('adds a new note to an array with data', () => {
    const notes = [];
    notes.push(new Note('existing', 'existing note'));
    const newNote = new Note('title', 'text');
    const newNotes = newNote.addNote(notes);
    expect(newNotes).toContain(newNote);
    expect(newNotes.length).toBe(2);
});

test('updates a note', () => {
    const notes = [];
    const originalNote = new Note('existing', 'existing note');
    notes.push(originalNote);
    originalNote.text = 'updated text'
    const newNotes = originalNote.updateNote(notes);
    expect(newNotes).toContain(originalNote);
    expect(newNotes.length).toBe(1);
});

test('returns undefined and doesnt update a non-existent note', () => {
    const notes = [];
    const originalNote = new Note('existing', 'existing note');
    notes.push(originalNote);
    const newNote = new Note('existing', 'updated text');
    const newNotes = newNote.updateNote(notes);
    expect(newNotes).toBeUndefined();
    expect(notes.length).toBe(1);
    expect(notes).toContain(originalNote);
});

test('deletes a note', () => {
    const notes = [];
    const originalNote = new Note('existing', 'existing note');
    notes.push(originalNote);
    const newNotes = Note.deleteNote(originalNote.id, notes)
    expect(newNotes).toBeDefined();
    expect(newNotes.length).toBe(0);
});


test('deletes an non-existent note', () => {
    const notes = [];
    const originalNote = new Note('existing', 'existing note');
    notes.push(originalNote);
    const noteToDelete = new Note('non existing', 'to be deleted');
    const newNotes = Note.deleteNote(noteToDelete.id, notes)
    expect(newNotes).toBeDefined();
    expect(newNotes.length).toBe(1);
    expect(newNotes).toContain(originalNote);
});