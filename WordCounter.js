const MapReduce = require("./MapReduce");

class WordCounter extends MapReduce {

  constructor(inputFileName, outputFileName) {
    super(inputFileName, outputFileName);
  }

  map = function(key, value) {
    const words = value.split(" ");

    words.forEach(word => {
      console.log(word)
      this.emitIntermediate(word, "1");
    });
  }

  reduce = function(key, values) {

  }

}

module.exports = WordCounter;