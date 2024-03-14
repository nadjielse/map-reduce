const FileGenerator = require("./fileGenerator");

/// param 0 = file amount
/// param 1 = word amount

// Parâmetros para o FileGenerator
const fileAmount = process.argv?.[2] || 10; // Número de arquivos em que o texto será dividido
const words = process.argv?.[3] || 1000; // Número de palavras a serem geradas
const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // Lista de caracteres permitidos
const minSize = 3; // Tamanho mínimo das palavras
const maxSize = 5; // Tamanho máximo das palavras

// Instância do FileGenerator
const fileGenerator = new FileGenerator(fileAmount, words, alphabet, minSize, maxSize);

// Gerar os arquivos de entrada
fileGenerator.generateFile();
