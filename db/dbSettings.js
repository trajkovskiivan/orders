const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const URL = `mongodb+srv://amin:root@cluster0.5m6bh.mongodb.net/artikuno?retryWrites=true&w=majority`;

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
