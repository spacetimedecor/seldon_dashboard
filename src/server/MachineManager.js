const Machine = require('./machine/index')
const machineOptions = require('./machine/machineOptions.js')

module.exports = client => {
	Machine.setupMachines(machineOptions);
	Machine.startMachines(() => {
		client.emit('MachineValues', Machine.GetAllMachineValues());
	})
}