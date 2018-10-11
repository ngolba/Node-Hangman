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
    console.log(word);
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
        if (!/^[a-zA-z]+$/.test(JSON.parse(body).word)) { // check if word has special characters 
            generateRandomWord();
        } else {
            startGame(JSON.parse(body).word);
            return;
        }
    })
}



generateRandomWord();