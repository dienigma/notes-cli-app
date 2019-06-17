console.log("Starting app.js");

const fs = require("fs");
const os = require("os");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");
const argv = yargs.argv;

var command = argv._[0];

// console.log("Command", command);
console.log("Yargs", argv);

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note Created with title ${note.title}`);
  } else {
    console.log(`The note already exits`);
  }
} else if (command === "list") {
  const notesList = notes.getAll();
  if (notesList.length !== 0) {
    notesList.map(note => {
      console.log(note.title);
      console.log(note.body);
      console.log("-------------------------");
    });
  } else {
    console.log(`There are no notes`);
  }
} else if (command === "read") {
  var gottenNote = notes.getNote(argv.title);
  // console.log(gottenNote);
  if (gottenNote) {
    console.log(`title: ${gottenNote.title}`);
    console.log("-------------------------");
    console.log(`body: ${gottenNote.body}`);
  } else {
    console.log("note does not exist");
  }
} else if (command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved
    ? "Note was removed"
    : "The note was note removed or it did not exist in the first place.";
  console.log(message);
} else {
  console.log(`Command not recognised`);
}
