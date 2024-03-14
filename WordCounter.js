const MapReduce = require("./MapReduce");

class WordCounter extends MapReduce {

  constructor(inputFileName, outputFileName) {
    super(inputFileName, outputFileName);
  }

  map = function(key, value) {
    const words = value.split(/\s+/);

    words.forEach(word => {
      this.emitIntermediate(word, "1");
    });
  }

  reduce = function(key, values) {
    this.emit(key, values.reduce((prev, curr) => prev + curr));
  }

}

module.exports = WordCounter;