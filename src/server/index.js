const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const machineManager = require("./MachineManager.js");

const PORT = process.env.PORT || 3231;

app.use(express.static(__dirname + "/../../build"));

io.on("connection", (client) => {
  machineManager.connect(client);
  client.on("disconnect", () => {
    machineManager.disconnect();
  });
});

io.on("to_server", (e) => {
  console.log("to_server", e);
});

server.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});
