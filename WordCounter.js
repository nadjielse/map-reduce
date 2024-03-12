const MapReduce = require("./MapReduce");

class WordCounter extends MapReduce {

  constructor(inputFileName, outputFileName) {
    super(inputFileName, outputFileName);
  }

  // key should be the document name
  // value should be the document content
  map = function(key, value) {
    const words = value.split(" ");

    words.forEach(word => {
      console.log(word)
      emitIntermediate(word, "1");
    });

    this.emitIntermediate();
  }

  reduce = function(key, values) {

  }

}

module.exports = WordCounter;