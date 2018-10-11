let Letter = require('./Letter'); 

class Word {
    constructor(word) {
        this.word = word;
        this.unprocessedLetterArray = [...word];
        this.processedLetterArray = [];
        this.printedLetters = ''
    }

    createLetters () {
        for (let i = 0; i < this.unprocessedLetterArray.length; i++) {
            this.processedLetterArray.push(new Letter(this.unprocessedLetterArray[i]))
        }
    }
    printString () {
        this.printedLetters = '';
        for (let i = 0; i < this.processedLetterArray.length; i++){
            this.printedLetters += `${this.processedLetterArray[i].printChar()} `
        }
        console.log(this.printedLetters);
    }

    guess (character) {
        for (let i = 0; i < this.processedLetterArray.length; i++){
            this.processedLetterArray[i].processGuess(character);
        }
    }
}

module.exports = Word;