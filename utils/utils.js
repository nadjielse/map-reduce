
// Gera um número aleatório entre min (incluído) e max (excluído)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // Retorna uma palavra aleatória de uma lista de caracteres
  function getRandomWord(alphabet) {
    const randomIndex = getRandomInt(0, alphabet.length);
    return alphabet[randomIndex];
  }
  
  module.exports = { getRandomInt, getRandomWord };