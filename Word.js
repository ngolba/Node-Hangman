let Letter = require('./Letter'); 

class Word {
    constructor(word) {
        this.word = word;
        this.unprocessedLetterArray = [...word];
        this.processedLetterArray = [];
        this.printedLetters = '';
    }

    createLetters () {
        this.processedLetterArray = this.unprocessedLetterArray.map(char => new Letter(char))
    }

    printString () {
        this.printedLetters = this.processedLetterArray.map(char => char.printChar()).join(' ')
        console.log(this.printedLetters);
    }

    guess (character) {
        return this.processedLetterArray.map(char => char.processGuess(character))
    }
}

module.exports = Word;