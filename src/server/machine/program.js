module.exports = class Program {

  constructor(options){
    this.options = options;
    this.getCPU = this.CPU();
    this.getMemory = this.Memory();
  }

  getValues = () => {
    return {
      CPU: this.getCPU.next().value,
      Memory: this.getMemory.next().value,
      Name: this.options.Name,
      StartTime: this.options.StartTime
    }
  }

  * CPU() {
    let index = 0;

    while (true) {
      yield index += Math.random();
    }
  }

  * Memory() {
    let index = 0;

    while (true) {
      yield index += Math.random();
    }
  }
}