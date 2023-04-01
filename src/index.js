const express = require("express");
const app = express();
require("./mongo");
const cors = require("cors");

const Note = require("./models/Notes.js");

app.use(express.json());

const logger = require("./middleware/logger");
const handleErrors = require("./middleware/handleErrors")
const notFound = require("./middleware/NotFound")

app.use(logger);
app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((note) => {
    response.json(note);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const { id } = request.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        return response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((e) => {
      console.log(e);
      response.status(400).end();
    });
});

app.delete("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;

  Note.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((e) => {
      next(e);
    });
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

app.put("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;
  const note = request.body;

  const newNote = {
    content: note.content,
    important: note.important,
  };

  Note.findByIdAndUpdate(id, newNote, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((e) => {
      next(e);
    });
});

app.use(handleErrors);

app.use(notFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
