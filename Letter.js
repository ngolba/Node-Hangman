class Letter {
    constructor (character) {
        this.character = character;
        this.guessed = false;
    }

    processGuess (guess) {
        if (this.character === guess) this.guessed = true;
    }

    printChar () {
        return this.guessed ? this.character : '_'
    }
}

module.exports = Letter;