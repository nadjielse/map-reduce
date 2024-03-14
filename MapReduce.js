const fs = require("fs");
const path = require("path");
const { Worker, isMainThread, parentPort } = require("worker_threads");

class MapReduce {
  constructor(inputFileName, outputFileName) {
    this.inputFolder = path.join(__dirname, "files");
    this.outputFolder = path.join(__dirname, "result");

    this.inputFileName = inputFileName;
    this.outputFileName = outputFileName;

    this.inputFileContent = "";

    try {
      this.readInputFiles();
      this.createIntermediateStream(); // Cria o fluxo intermediário
    } catch (error) {
      console.error("Error reading input files:", error);
    }
  }

  readInputFiles() {
    const fileNames = fs.readdirSync(this.inputFolder);
    this.inputFileContent = fileNames
      .map((fileName) => {
        const filePath = path.join(this.inputFolder, fileName);
        return fs.readFileSync(filePath, { encoding: "utf-8" });
      })
      .join("\n");
  }

  // Função Map: divide as linhas em palavras e emite pares chave-valor intermediários
  map(key, value) {
    const words = value.split(/\s+/);
    words.forEach((word) => {
      this.emitIntermediate(word, 1);
    });
  }

  // Função Reduce: soma os valores associados a uma chave e emite o resultado final
  reduce(key, values) {
    const count = values.reduce((acc, val) => acc + val, 0);
    this.emit(key, count);
  }

  // Cria um fluxo de escrita para o arquivo intermediário
  createIntermediateStream() {
    this.intermediateStream = fs.createWriteStream(
      path.join(this.outputFolder, this.outputFileName + ".tmp"),
      { flags: "a" }
    );
  }

  // Emite um par chave-valor intermediário para o arquivo temporário
  emitIntermediate(key, value) {
    if (this.intermediateStream == null) this.createIntermediateStream();

    this.intermediateStream.write(`${key} ${value}\n`);
  }

  // Lê os resultados intermediários do arquivo temporário e os armazena no objeto mapper
  collect() {
    const outputFilePath = path.join(
      this.outputFolder,
      this.outputFileName + ".tmp"
    );
    if (!fs.existsSync(outputFilePath)) {
      throw new Error(`Output file '${this.outputFileName}.tmp' not found.`);
    }

    const intermediateOutput = fs.readFileSync(outputFilePath, {
      encoding: "utf-8",
    });
    const lines = intermediateOutput.split(/\r?\n/);
    this.mapper = {}; // Inicializa o objeto mapper
    lines.forEach((line) => {
      const [key, value] = line.split(" ");
      if (key !== "") {
        // Verifica se key não é vazia
        if (!this.mapper[key]) {
          this.mapper[key] = [];
        }
        this.mapper[key].push(parseInt(value));
      }
    });
  }
  // Cria um fluxo de escrita para o arquivo de saída final
  createOutputStream() {
    this.outputStream = fs.createWriteStream(
      path.join(this.outputFolder, this.outputFileName + ".txt"),
      { flags: "a" }
    );
  }

  // Emite um par chave-valor para o arquivo final
  emit(key, value) {
    if (this.outputStream == null) this.createOutputStream();

    this.outputStream.write(`${key} ${value}\n`);
  }

  // Inicia o processo de MapReduce
  startMapReduce() {
    // Divide o conteúdo do arquivo de entrada em partes e processa em paralelo
    const lines = this.inputFileContent.split(/\r?\n/);
    const numThreads = Math.min(lines.length, require("os").cpus().length); // Usa o número de núcleos disponíveis
    const threadChunks = this.chunkArray(lines, numThreads);

    const workerPromises = threadChunks.map((chunk) => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, { workerData: { lines: chunk } });
        worker.on("message", (message) => {
          resolve(message);
        });
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      });
    });

    // Aguarda o término de todas as threads e então executa a fase de Reduce
    Promise.all(workerPromises)
      .then(() => {
        this.collect();
        for (const key in this.mapper) {
          this.reduce(key, this.mapper[key]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Divide um array em partes iguais
  chunkArray(array, chunks) {
    const result = [];
    const chunkSize = Math.ceil(array.length / chunks);
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
}

// Se não for a thread principal, processa as linhas atribuídas à thread
if (!isMainThread) {
  const { lines } = require("worker_threads").workerData;
  const mapReduce = new MapReduce();
  lines.forEach((line) => {
    const [key, value] = line.split(" ");
    mapReduce.map(key, value);
  });
  parentPort.postMessage("done"); // Envia mensagem indicando que o processamento foi concluído
}

module.exports = MapReduce;
