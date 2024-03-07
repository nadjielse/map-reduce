class MapReduce {

    {
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

    emitIntermediate = function() {
        fs.writeFile
    }

    emit = function() {

    }

    map = function(key, value) {

    }

    reduce = function(key, values) {

    }

}

module.exports = MapReduce;
