const Machine = require('./machine/index')
const machineOptions = require('./machine/machineOptions.js')

module.exports.connect = (client) => {
  Machine.setupMachines(machineOptions);
  Machine.startMachines();
  Machine.setOnTick((MachineValues) => {
    client.emit("message", {
      type: "RECEIVE_MACHINE_UPDATES",
      MachineValues
    });
  })
};

module.exports.disconnect = () => {
  Machine.stopMachines();
}
