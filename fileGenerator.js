const fs = require('fs');
const path = require('path');
const { getRandomWord, getRandomInt } = require('./utils/utils');

class FileGenerator {
  constructor(split, N, alphabet, minSize, maxSize) {
    this.split = split;
    this.N = N;
    this.alphabet = alphabet;
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  generateRandomWord() {
    const size = getRandomInt(this.minSize, this.maxSize);
    let word = '';
    for (let i = 0; i < size; i++) {
      const randomIndex = getRandomInt(0, this.alphabet.length - 1);
      word += this.alphabet[randomIndex];
    }
    return word;
  }

  generateFile() {
    const words = [];
    for (let i = 0; i < this.N; i++) {
      words.push(this.generateRandomWord());
    }

    const chunks = Math.ceil(words.length / this.split);

    for (let i = 0; i < this.split; i++) {
      const fileName = path.join(__dirname + "/files", `file_part_${i + 1}.txt`);
      const start = i * chunks;
      const end = (i + 1) * chunks;
      const chunkWords = words.slice(start, end).join(' ');

      fs.writeFileSync(fileName, chunkWords);
      console.log(`File ${i + 1} created: ${fileName}`);
    }
  }
}

module.exports = FileGenerator;
