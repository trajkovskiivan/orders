const express = require("express");
const http = require("http");
const cors = require("cors");
const dbConnection = require("./db/dbSettings");
const controller = require("./routes");

const PORT = 5050;
const port = normalizePort(PORT);

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/orders", controller.orders);

server.listen(port, () => console.log(`Server running on port ${port}`));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
