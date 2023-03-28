const mongoose = require("mongoose");
require("dotenv").config();


const password = process.env.MONGO_PASSWORD;

const connectionStrieng = `mongodb+srv://RayCode03:${password}@cluster0.udgg8dc.mongodb.net/AppNotes?retryWrites=true&w=majority`;

mongoose
  .connect(connectionStrieng, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

