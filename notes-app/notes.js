const chalk = require('chalk');
const fs = require('fs');

const listNotes = () => {
  console.log(chalk.black.bgCyan('🌟 Your Notes'.padEnd(17)));
  const note = loadNotes();
  note.forEach(note =>
    console.log('=> ' + chalk.bgMagenta(note.title.padEnd(14)))
  );
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen('Note Added!'));
  } else {
    console.log(chalk.bgRed('Note title taken'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  if (newNotes.length === notes.length) {
    console.log(chalk.bgRed(`No note found with the Title: "${title}"`));
  } else {
    saveNotes(newNotes);
    console.log(chalk.bgGreen(`Note deleted successfully!`));
  }
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.black.bgCyan('🌟 ' + note.title + ' 🌟'));
    console.log('=> ' + note.body);
  } else {
    console.log(chalk.bgRed(`No note found with the Title: "${title}"`));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const saveNotes = notes =>
  fs.writeFileSync('notes.json', JSON.stringify(notes));

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
