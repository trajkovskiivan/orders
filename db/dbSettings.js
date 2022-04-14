const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;
const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5m6bh.mongodb.net/artikuno?retryWrites=true&w=majority`;

try {
  mongoose.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect", e.message);
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

module.exports = dbConnection;
