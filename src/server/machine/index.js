const Program = require("./program");

module.exports = class Machine {

  // Members
  static timer = null;
  static onTick = null;
  static pollTime = 500;

  // Machines Controllers
  static setupMachines(machinesOptions){
    this.machines = machinesOptions
      .map(machineOptions => new Machine(machineOptions))
  }

  static stopMachines(){
    // clearInterval(Machine.timer)
  }

  static startMachines(){

    const func = () => {
      if (Machine.onTick !== null){
        Machine.onTick(this.GetAllMachineValues())
      }
      setTimeout(func, Machine.pollTime);
    }

    setTimeout(func, Machine.pollTime);
  }

  // Setters
  static setOnTick(callback){
    Machine.onTick = callback
  }

  static setPollSpeed(to){
    Machine.pollTime = to
  }

  // Getters:
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