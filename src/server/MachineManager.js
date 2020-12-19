const Machine = require('./machine/index');

let hasSetup = false;

module.exports.setup = () => {
  if (!hasSetup) {
    Machine.setupMachines();
    hasSetup = true;
  }
}

module.exports.connect = (client) => {
  Machine.startMachines();
  Machine.setOnTick((MachineValues) => {
    client.emit("message", {
      type: "RECEIVE_MACHINE_UPDATES",
      MachineValues
    });
  });
};
module.exports.disconnect = () => { Machine.stopMachines(); }
module.exports.setPollSpeed = (to) => { Machine.setPollSpeed(to); }
module.exports.addMachine = (machineSetting) => { Machine.addMachine(machineSetting); }
