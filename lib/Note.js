const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class Note {
    constructor(title, text) {
        this.id = uuidv4();
        this.title = title;
        this.text = text;
    }

    validateNote() {
        if (this.title && this.text) {
            return true;
        }
        return false;
    }

    addNote(notesArr) {
        notesArr.push(this);
        Note.saveToFile(notesArr);
        return notesArr;
    }

    static saveToFile(notesArr) {
        fs.writeFileSync(path.resolve(__dirname, '../db/db.json'), JSON.stringify(notesArr));
    }

    updateNote(notesArr) {
        const noteIndex = notesArr.findIndex(item => item.id === this.id);
        if (noteIndex < 0) {
            return undefined;
        }
        notesArr[noteIndex].title = this.title;
        notesArr[noteIndex].text = this.text;
        Note.saveToFile(notesArr);
        return notesArr;
    }

    static deleteNote(noteId, notesArr) {
        const newArray = notesArr.filter(item => item.id !== noteId);
        Note.saveToFile(newArray);
        return newArray;
    }
    
}

module.exports = Note;