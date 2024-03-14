const fs = require("fs");
const path = require("path");

class MapReduce {
  constructor(inputFileName, outputFileName) {
    this.inputFolder = path.join(__dirname, "files");

    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName;

    this.intermediateStream = null;
    this.outputStream = null;

    this.inputFileContent = "";

    this.mapper = {};

    this.readInputFile();
  }

  readInputFile() {
    this.inputFileContent = fs.readFileSync(
      path.join(this.inputFolder, this.inputFileName + ".txt"),
      { encoding: "utf-8" }
    );
  }

  // Cria um fluxo de escrita para o arquivo intermediário
  createIntermediateStream() {
    if(!fs.existsSync(this.outputFileName + ".tmp")) fs.writeFileSync(this.outputFileName + ".tmp", "");

    this.intermediateStream = fs.createWriteStream(
      this.outputFileName + ".tmp",
      { flags: "a" }
    );
  }

  // Cria um fluxo de escrita para o arquivo de saída final
  createOutputStream() {
    if(!fs.existsSync(this.outputFileName + ".txt")) fs.writeFileSync(this.outputFileName + ".txt", "");

    this.outputStream = fs.createWriteStream(
      this.outputFileName + ".txt",
      { flags: "a" }
    );
  }

  // Emite um par chave-valor intermediário para o arquivo temporário
  emitIntermediate(key, value) {
    if (this.intermediateStream == null) this.createIntermediateStream();

    this.intermediateStream.write(`${key} ${value}\n`);
  }

  // Emite um par chave-valor para o arquivo final
  emit(key, value) {
    if (this.outputStream == null) this.createOutputStream();

    this.outputStream.write(`${key} ${value}\n`);
  }

  // Função Map: divide as linhas em palavras e emite pares chave-valor intermediários
  map(key, value) {
    
  }

  // Função Reduce: soma os valores associados a uma chave e emite o resultado final
  reduce(key, values) {
    
  }

  // Lê os resultados intermediários do arquivo temporário e os armazena no objeto mapper
  collect() {
    const intermediateOutput = fs.readFileSync(this.outputFileName + ".tmp", { encoding: "utf-8" });
    const lines = intermediateOutput.split(/\r?\n/);
    lines.forEach(line => {
      const [ key, value ] = line.split(" ");

      console.log(key, value)

      if(key === undefined || value === undefined) return;

      if(this.mapper[key] === undefined) this.mapper[key] = [];

      this.mapper[key].push(value);
    });
  }
  
}

module.exports = MapReduce;
