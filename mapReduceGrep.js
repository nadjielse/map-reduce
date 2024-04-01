const fs = require("fs");

// Função Map: Verifica se cada linha contém o padrão informado e emite a linha se houver correspondência
function mapper(filenames, pattern) {
  const matchedLines = [];

  filenames.forEach((filename) => {
    const lines = fs.readFileSync(filename, "utf8").split("\n");

    lines.forEach((line) => {
      if (line.match(pattern)) {
        matchedLines.push(line);
      }
    });
  });

  return matchedLines;
}

// Função Reduce: Concatena os arrays de linhas correspondentes de todos os mappers
function reducer(mappedResults) {
  return mappedResults.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
  );
}

// Função principal: Executa o MapReduce
function grep(filenames, pattern) {
  const mappedResults = mapper(filenames, pattern);
  const reducedResults = reducer(mappedResults);

  // Retornar os resultados correspondentes
  return reducedResults;
}

// Exemplo de uso:
const filenames = [
  "./files/file_part_1.txt",
  "./files/file_part_2.txt",
  "./files/file_part_3.txt",
]; // Array de nomes de arquivos
const pattern = /xso/; // Padrão de expressão regular
const matchedLines = grep(filenames, pattern);

// Exibir os resultados correspondentes no console
console.log("Linhas correspondentes:");
matchedLines.forEach((line) => {
  console.log(line);
});
