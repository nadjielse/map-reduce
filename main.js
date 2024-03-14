const fs = require("fs");
const path = require("path");
const WordCounter = require("./WordCounter");

const inputFiles = fs.readdirSync(path.join(__dirname, "files"));
const wordCounters = [];

inputFiles.forEach(inputFile => {
  const inputFileName = inputFile.replace(".txt", "");
  wordCounters.push(new WordCounter(inputFileName, "output"));
});

wordCounters.forEach(wordCounter => {
  if(wordCounter.inputFileName != "file_part_1") return;

  wordCounter.map(wordCounter.inputFileName, wordCounter.inputFileContent);

  wordCounter.collect();
  
  console.log(wordCounter.mapper)
  
  for(const word in wordCounter.mapper) {
    wordCounter.reduce(word, wordCounter.mapper[word]);
  }
})
