let Letter = require('./Letter'); 

class Word {
    constructor(word) {
        this.word = word;
        this.unprocessedLetterArray = [...word];
        this.processedLetterArray = [];
        this.printedLetters = '';
    }

    createLetters () {
        this.processedLetterArray = this.unprocessedLetterArray.map(x => new Letter(x))
    }

    printString () {
        this.printedLetters = this.processedLetterArray.map(x => x.printChar()).join(' ')
        console.log(this.printedLetters);
    }

    guess (character) {
        return this.processedLetterArray.map(x => x.processGuess(character))
    }
}

module.exports = Word;