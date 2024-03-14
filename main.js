const WordCounter = require("./WordCounter");

const wordCounter = new WordCounter("file_part_1", "output");

wordCounter.map(wordCounter.inputFileName, wordCounter.inputFileContent);

setTimeout(() => {
  wordCounter.collect();
  
  for(const word in wordCounter.mapper) {
    wordCounter.reduce(word, wordCounter.mapper[word]);
  }
}, 1000);
