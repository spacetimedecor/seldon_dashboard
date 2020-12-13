const Machine = require('./machine/index');

module.exports.setup = (client) => {
  Machine.setupMachines();
  // Machine.startMachines();
  Machine.setOnTick((MachineValues) => {
    client.emit("message", {
      type: "RECEIVE_MACHINE_UPDATES",
      MachineValues
    });
  });
}

module.exports.connect = () => { Machine.startMachines(); };
module.exports.disconnect = () => { Machine.stopMachines(); }
module.exports.setPollSpeed = (to) => { Machine.setPollSpeed(to); }
module.exports.addMachine = (machineSetting) => { Machine.addMachine(machineSetting); }
