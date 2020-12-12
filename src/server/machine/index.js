const Program = require("./program");

module.exports = class Machine {

  // Members
  static timer = null;
  static onTick = null;

  // Machines Controllers
  static setupMachines(machinesOptions){
    this.machines = machinesOptions
      .map(machineOptions => new Machine(machineOptions))
  }

  static startMachines(){
    Machine.timer = setInterval(() => {
      Machine.onTick?.(this.GetAllMachineValues())
    }, 1000);
  }

  static setOnTick(callback){
    Machine.onTick = callback
  }

  static stopMachines(){
    clearInterval(Machine.timer)
  }

  static GetAllMachineValues(){
    return this.machines
      .map(machine => machine.getValues())
  }

  // Machine instance
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
      ProgramValues: this.programs.map(program => program.getValues()),
      Name: this.options.Name,
      StartTime: this.options.StartTime,
    }
  }
}