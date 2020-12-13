const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const machineManager = require("./MachineManager.js");

const PORT = process.env.PORT || 3231;

app.use(express.static(__dirname + "/../../build"));

io.on("connection", (socket) => {

  machineManager.connect(socket);

  socket.on("disconnect", () => {
    machineManager.disconnect();
  });

  socket.on("TO_SERVER", (e) => {
    console.log("TO_SERVER", e);
  });

  socket.on("SET_POLL_SPEED", (e) => {
    console.log("SET_POLL_SPEED", e);
    machineManager.setPollSpeed(e)
  });

  socket.on("ADD_MACHINE", (e) => {
    console.log("ADD_MACHINE", e);
    machineManager.addMachine(e)
  });
});



server.listen(PORT, () => {
  console.log("Connected to port:" + PORT);
});
