require('dotenv').config()
const Word = require("./Word");
const prompt = require('prompt');
const request = require('request');
const colors = require('colors');
const keys = require('./keys');
const wordnikApiKey = (keys.wordnik.apiKey);
const requestUrl = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun&minCorpusCount=5000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${wordnikApiKey}`

let currentWord = '';
let currentGuess = '';
let guessesLeft = 10;
let incorrectGuesses = '';
let guesses = [];
let lettersRemaining = [];
const userInput = {
    properties: {
        guess: {
            description: colors.cyan("Guess a letter"),
            pattern: /^[a-zA-Z]+$/,
            message: 'Enter a valid letter.',
            required: true,
            type: 'string'
        }
    }
}

const lineBreak = () => console.log('\n******************************************************\n');

const checkGameState = () => {
    if (guessesLeft === 0) {
        console.log(`Game Over. The word was '${currentWord.word}'`);
        process.exit();
    }
    lettersRemaining = currentWord.processedLetterArray.filter(letter => !letter.guessed)
    if (!lettersRemaining.length) {
        console.log("You've won!");
        process.exit();
    }
}

const updatePlay = (guess) => {
    lineBreak()
    currentWord.guess(guess);
    guesses.push(guess);
    if (currentWord.unprocessedLetterArray.indexOf(guess) === -1) {
        guessesLeft--;
        incorrectGuesses += `${guess} `
    }
    console.log(colors.red(`Incorrect guesses: ${incorrectGuesses}`));
    console.log(`Guesses remaining: ${guessesLeft}`);
    currentWord.printString();
    lineBreak();
    checkGameState();
    receiveGuess();
}

const receiveGuess = () => {
    console.log('\n')
    prompt.message = ''
    prompt.delimiter = colors.magenta(':')
    prompt.start();
    prompt.get(userInput, (err, result) => {
        currentGuess = result.guess;
        if (currentGuess.length > 1) {
            console.log('Enter a single letter');
            receiveGuess();
        } else if (guesses.indexOf(currentGuess) != -1) {
            console.log('You\'ve already guessed that.')
            receiveGuess();
        } else {
            updatePlay(currentGuess);
        }
    })
}

const startGame = (word) => {
    guessesLeft = 10;
    currentWord = new Word(word);
    currentWord.createLetters();
    currentWord.printString();
    receiveGuess()
}

const generateRandomWord = () => {
    request(requestUrl, (error, _, body) => {
        if (error) {
            console.log("Error with API call.")
            return;
        }

        (!/^[a-zA-z]+$/.test(JSON.parse(body).word)) ? generateRandomWord() : startGame((JSON.parse(body).word).toLowerCase());
    })
}



generateRandomWord();