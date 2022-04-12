const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes.js');

//string isEmpty
const stringIsEmptyOf = str =>
  validator.isEmpty(str, { ignore_whitespace: true });

// customize yargs version
yargs.version('1.1.0');

//create add commmand
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (stringIsEmptyOf(argv.title)) return;
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (stringIsEmptyOf(argv.title)) return;
    notes.removeNote(argv.title);
  },
});

//create list command
yargs.command({
  command: 'list',
  describe: 'To list all notes',
  handler() {
    notes.listNotes();
  },
});

//create read command
yargs.command({
  command: 'read',
  describe: 'To read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (stringIsEmptyOf(argv.title)) return;
    notes.readNote(argv.title);
  },
});

yargs.parse();
