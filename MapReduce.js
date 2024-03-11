const fs = require("fs");

class MapReduce {

  constructor(inputFileName, outputFileName) {
    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName;
    this.intermediateStream = null;
    this.outputStream = null;
    this.mapper = {};
  }

  createIntermediateStream = function() {
    this.intermediateStream = fs.createWriteStream(this.outputFileName + ".tmp", { flags: "a" });
  }

  createOutputStream = function() {
    this.outputStream = fs.createWriteStream(this.outputFileName + ".txt", { flags: "a" });
  }

  closeItermediateStream = function() {
    this.intermediateStream.end();
  }

  closeOutputStream = function() {
    this.outputStream.end();
  }

  collect = function() {
    const intermediateOutput = fs.readFileSync(this.outputFileName + ".tmp", { encoding: "utf-8" });
    const lines = intermediateOutput.split(/\r?\n/);
    lines.forEach(line => {
      const [ key, value ] = line.split(" ");
      this.mapper[key] = value;
    });
  }

  emitIntermediate = function(key, value) {
    if(this.intermediateStream == null) this.createIntermediateStream();

    this.intermediateStream.write(`${key} ${value}\n`);
  }

  emit = function(key, value) {
    if(this.outputStream == null) this.createOutputStream();

    this.outputStream.write(`${key} ${value}\n`);
  }

  map = function(key, value) {

  }

  reduce = function(key, values) {

  }

}

module.exports = MapReduce;
