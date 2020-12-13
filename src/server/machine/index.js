const { v4: uuid } = require('uuid');
const Program = require("./program");
const defaultSettings = require('./defaultSettings.js')

module.exports = class Machine {

  // Members
  static running = false;
  static onTick = null;
  static pollTime = 500;
  static machines = [];

  // Machines Controllers
  static setupMachines(){
    Machine.machines = defaultSettings
      .map(machineSetting => new Machine(machineSetting));

    const func = () => {
      if (
        Machine.onTick !== null &&
        Machine.running === true
      ){
        console.log(1);
        Machine.onTick(this.GetAllMachineValues())
      }
      setTimeout(func, Machine.pollTime);
    }

    setTimeout(func, Machine.pollTime);
  }

  static createMachineState(machineSetting){
    return {
      ID: uuid(),
      Name: machineSetting.Name,
      StartTime: new Date().getTime(),
      Programs: machineSetting.Programs
        .map(program => {
            return {
              ID: uuid(),
              Name: program.Name,
              StartTime: new Date().getTime(),
            }
          }
        )
    }
  }

  static addMachine(machineSetting){
    console.log("ADD_MACHINE", machineSetting);
    Machine.machines =
      [
        ...Machine.machines,
        new Machine(
          machineSetting !== null ?
            machineSetting
              :
            {
              Name: `Machine ${Machine.machines.length + 1}`,
              Programs: [
                {
                  Name: 'Program 1'
                }
              ]
            }
          )
      ]
  }

  static stopMachines(){
    Machine.running = false;
  }

  static startMachines(){
    Machine.running = true;
  }

  // Setters
  static setOnTick(callback){
    Machine.onTick = callback
  }

  static setPollSpeed(to){
    console.log("SET_POLL_SPEED", to);
    Machine.pollTime = to
  }

  // Getters:
  static GetAllMachineValues(){
    return Machine.machines
      .map(machine => machine.getValues())
  }

  // Machine instance
  constructor(machineSetting){
    this.machineSetting = Machine.createMachineState(machineSetting)
    this.initialise();
  }

  initialise(){
    this.programs = this.machineSetting.Programs
      .map(programOptions => new Program(programOptions))
  }

  getValues = () => {
    return {
      ProgramValues: this.programs.map(program => program.getValues()),
      Name: this.machineSetting.Name,
      StartTime: this.machineSetting.StartTime,
      ID: this.machineSetting.ID,
    }
  }
}