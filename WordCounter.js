const MapReduce = require("./MapReduce");

class WordCounter extends MapReduce {

    map = function(key, value) {
        const words = value.split(" ");

        words.forEach(word => {
            console.log(word)
            emitIntermediate(word, "1");
        });
    }

    reduce = function(key, values) {

    }

}

module.exports = WordCounter;