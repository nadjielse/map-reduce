const WordCounter = require("./WordCounter");

// Criar uma instância do MapReduce
const wordCounter = new WordCounter("file_part_1", "output");

wordCounter.map(wordCounter.inputFileName, wordCounter.inputFileContent);

wordCounter.collect();

for(const word in wordCounter.mapper) {
  wordCounter.reduce(word, wordCounter.mapper[word]);
}



//console.log(wordCounter.mapper)

// for (const key in wordCounter.mapper) {
//   wordCounter.reduce(key)
// }
