const FileGenerator = require("./fileGenerator");

// Parâmetros para o FileGenerator
const split = 3; // Número de arquivos em que o texto será dividido
const N = 100; // Número de palavras a serem geradas
const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // Lista de caracteres permitidos
const minSize = 3; // Tamanho mínimo das palavras
const maxSize = 8; // Tamanho máximo das palavras

// Instância do FileGenerator
const fileGenerator = new FileGenerator(split, N, alphabet, minSize, maxSize);

// Gerar os arquivos de entrada
fileGenerator.generateFile();
