const express = require("express");
const app = express();
require("./mongo");
const cors = require("cors");

const Note = require("./models/Notes.js");

app.use(express.json());

const logger = require("./middleware/logger");

app.use(logger);

app.use(cors());

let notas = [
  {
    id: 1,
    content: "This is a note",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },

  {
    id: 2,
    content: "This is another note",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },

  {
    id: 3,

    content: "This is the last note",

    date: "2019-05-30T19:20:14.298Z",

    important: true,
  },

  {
    id: 4,

    content: "Raymond is the best",

    date: "2022-05-30T19:20:14.ADD",

    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((note) => {
    response.json(note);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  const note = notas.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  notas = notas.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  if (!note || !note.content) {
    return response.status(400).json({
      error: "note.content is missing",
    });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    import: note.important || false,
  });

  newNote.save().then((saveNote) => {
    response.json(saveNote);
  });

});

app.use((request, response) => {
  response.status(404).json({
    error: "Not found",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
