const {Noise} = require('noisejs');

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
    const noise = new noiseGenerator();
    yield noise.gen;
  }

  * Memory() {
    const noise = new noiseGenerator();
    yield noise.gen;
  }
}

class noiseGenerator {
  constructor() {
    this.i = 0;
    this.noise = new Noise(Math.random());
  }

  * gen() {
    while (true) {
      yield Math.abs(this.noise.perlin2(this.i, this.i) * 100);
      this.i += 0.01;//<-- set these in settings
    }
  }
}