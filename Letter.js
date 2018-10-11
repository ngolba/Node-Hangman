class Letter {
    constructor (character) {
        this.character = character;
        this.guessed = false;
    }

    processGuess (guess) {
        if (this.character === guess){
            this.guessed = true;
        }
    }
    printChar () {
        if (this.guessed) {
            return this.character;
        } else {
            return '_';
        }
    }

}

module.exports = Letter;