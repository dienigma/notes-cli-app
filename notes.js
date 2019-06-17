console.log(`Notes.js starting`);

const fs = require("fs");

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync("notes-data.json");

    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = notes => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  const notes = fetchNotes();
  return notes;
};

var removeNote = title => {
  const notes = fetchNotes();
  const resNotes = notes.filter(note => note.title !== title);
  saveNotes(resNotes);
  return notes.length !== resNotes.length;
};

var getNote = title => {
  const notes = fetchNotes();
  const note = notes.filter(note => note.title === title)[0];
  return note;
};
module.exports = {
  addNote,
  getAll,
  removeNote,
  getNote
};
