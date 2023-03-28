const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});


noteSchema.set("toJSON", {
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Note = model("Note", noteSchema);



/* const note = new Note({
  content: "MongoDB es increible, midu",
  date: new Date(),
  important: true,
});

note
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  }); */
/* 
Note.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
});
 */



module.exports = Note
