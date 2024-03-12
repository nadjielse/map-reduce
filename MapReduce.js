const fs = require("fs");
const path = require("path");

/**
  * Cria uma instância do MapReduce que lê de um arquivo e anexa o resultado em outro.
  * @param {string} inputFileName O nome do arquivo de onde a entrada será lida.
  * @param {string} outputFileName O nome do arquivo onde a saída será escrita.
 */
class MapReduce {
  
  constructor(inputFileName, outputFileName) {
    this.inputFolder = path.join(__dirname, "files");
    this.outputFolder = path.join(__dirname, "result");

    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName;

    this.inputFileContent = "";
    this.intermediateStream = null;
    this.outputStream = null;

    this.mapper = {};

    this.readInputFile();
  }

  /**
   * Cria uma stream que permite anexar conteúdo ao arquivo de saída intermediário.
   */
  createIntermediateStream = function() {
    this.intermediateStream = fs.createWriteStream(
      path.join(this.outputFolder, this.outputFileName + ".tmp"), { flags: "a" }
    );
  }

  /** Cria uma stream que permite anexar conteúdo ao arquivo de saída final. */
  createOutputStream = function() {
    this.outputStream = fs.createWriteStream(
      path.join(this.outputFolder, this.outputFileName + ".txt"), { flags: "a" }
    );
  }

  closeItermediateStream = function() {
    this.intermediateStream.end();
  }

  closeOutputStream = function() {
    this.outputStream.end();
  }

  /**
   * Lê o arquivo de entrada e guarda seus dados na propriedade inputFileContent.
   */
  readInputFile = function() {
    this.inputFileContent = fs.readFileSync(
      path.join(this.inputFolder, this.inputFileName + ".txt"),
      { encoding: "utf-8" }
    );
  }

  /**
   * Guarda as informações do arquivo intermediário na propriedade mapper desta classe.
   */
  collect = function() {
    const intermediateOutput = fs.readFileSync(this.outputFileName + ".tmp", { encoding: "utf-8" });
    const lines = intermediateOutput.split(/\r?\n/);
    lines.forEach(line => {
      const [ key, value ] = line.split(" ");
      this.mapper[key] = value;
    });
  }

  /**
   * Escreve um conjunto de chave e valor numa nova linha do arquivo intermediário.
   * @param {string} key A chave que será associada ao valor.
   * @param {string} value O valor que será associado à chave.
   */
  emitIntermediate = function(key, value) {
    if(this.intermediateStream == null) this.createIntermediateStream();

    this.intermediateStream.write(`${key} ${value}\n`);
  }

  /**
   * Escreve um conjunto de chave e valor numa nova linha do arquivo final.
   * @param {string} key A chave que será associada ao valor.
   * @param {string} value O valor que será associado à chave.
   */
  emit = function(key, value) {
    if(this.outputStream == null) this.createOutputStream();

    this.outputStream.write(`${key} ${value}\n`);
  }

  /**
   * Abstração da função map, que deve ser definida pelo usuário.
   * @param {string} key Uma chave que pode ser usada na função.
   * @param {string} value Um valor que pode ser usado na função.
   */
  map = function(key, value) {

  }

  reduce = function(key, values) {

  }

}

module.exports = MapReduce;
