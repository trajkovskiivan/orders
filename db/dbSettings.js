const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const URL = `mongodb+srv://username:pass@cluster0.5m6bh.mongodb.net/artikuno?retryWrites=true&w=majority`;

try {
  // Connect to the MongoDB cluster
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
