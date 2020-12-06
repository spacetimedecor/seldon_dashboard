const Program = require("./program");

module.exports = class Machine {

  static timer;

  static setupMachines(machinesOptions){
    this.machines = machinesOptions
      .map(machineOptions => new Machine(machineOptions))
  }

  static startMachines(callback){
    Machine.timer = setInterval(() => callback(), 1000);
  }

  static stopMachines(){
    clearInterval(Machine.timer)
  }

  static GetAllMachineValues(){
    return this.machines
      .map(machine => machine.getValues())
  }

  constructor(machineOptions){
    this.options = machineOptions;
    this.initialise();
  }

  initialise(){
    this.programs = this.options.Programs
      .map(programOptions => new Program(programOptions))
  }

  getValues = () => {
    return {
      ProgramValues: this.getProgramValues(),
      Name: this.options.Name,
      StartTime: this.options.StartTime,
    }
  }

  getProgramValues = () => {
    return this.programs
      .map(program => program.getValues())
  }
}