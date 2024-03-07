const fs = require('fs');
const path = require("path");
const FileGenerator = require('./fileGenerator');
const WordCounter = require("./WordCounter");

// Parâmetros para o FileGenerator
const split = 3; // Número de arquivos em que o texto será dividido
const N = 100; // Número de palavras a serem geradas
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Lista de caracteres permitidos
const minSize = 3; // Tamanho mínimo das palavras
const maxSize = 8; // Tamanho máximo das palavras

// Instância do FileGenerator
const fileGenerator = new FileGenerator(split, N, alphabet, minSize, maxSize);

 // Gera o arquivo de texto dividido em partes
fileGenerator.generateFile();

const filePart1 = fs.readFileSync(path.join(__dirname + "/files", `file_part_1.txt`), "utf-8");

const wordCounter = new WordCounter();
wordCounter.map("", filePart1);

// // Exemplo de como usar o MapReduce com os arquivos gerados
// const mapReduce = new MapReduce();

// // Chama as funções Map e Reduce
// mapReduce.run();
