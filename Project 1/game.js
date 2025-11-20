var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var stats = { wins: 0, losses: 0, ties: 0 };
// Typescript specific!
// our generic function to get random element from array
// used for choices, victoryQuotes, and emojies
function getRandomElement(array) {
    if (array.length === 0) {
        throw new Error('Array cannot be empty');
    }
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
function getComputerChoice(difficulty) {
    var choices = ['rock', 'paper', 'scissors'];
    // easy mode has predictable pattern
    if (difficulty === 'easy') {
        return 'rock'; // always returns rock ol
    }
    return getRandomElement(choices);
}
// type narrowing with type guards
function isValidChoice(input) {
    return input === 'rock' || input === 'paper' || input === 'scissors';
}
// type narrowing with switch statement
function determineWinner(playerChoice, computerChoice) {
    // if statement for tie
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    // switch statement
    switch (playerChoice) {
        case 'rock':
            return computerChoice === 'scissors' ? 'win' : 'lose';
        case 'paper':
            return computerChoice === 'rock' ? 'win' : 'lose';
        case 'scissors':
            return computerChoice === 'paper' ? 'win' : 'lose';
        default:
            return 'tie';
    }
}
function updateStats(stats, result, increment) {
    var updated = __assign({}, stats);
    var incrementValue = increment !== null && increment !== void 0 ? increment : 1; // Default to 1 if not provided
    // Type narrowing: narrow the result type to determine which stat to update
    if (isWinResult(result)) {
        updated.wins += incrementValue;
    }
    else if (isLoseResult(result)) {
        updated.losses += incrementValue;
    }
    else {
        updated.ties += incrementValue;
    }
    return updated;
}
// Type narrowing: type guard functions for Result type
function isWinResult(result) {
    return result === 'win';
}
function isLoseResult(result) {
    return result === 'lose';
}
function isTieResult(result) {
    return result === 'tie';
}
function getEmoji(choice) {
    switch (choice) {
        case 'rock': return '🪨';
        case 'paper': return '📄';
        case 'scissors': return '✂️';
        default: return '❓';
    }
}
// for gen func
// victory quotes array
var victoryQuotes = [
    '🎉 Victory is yours!',
    '🏆 You crushed it!',
    '⭐ Amazing play!',
    '🔥 You\'re on fire!',
    '💪 Dominant performance!'
];
// for gen func
// emoji reactions array
var reactionEmojis = ['🎊', '🎈', '🎁', '🌟', '✨'];
// Generic function used for victory messages
function getRandomVictoryMessage() {
    return getRandomElement(victoryQuotes);
}
// Generic function used for emoji reactions
function getRandomReactionEmoji() {
    return getRandomElement(reactionEmojis);
}
// verbose flag for console logging
function playRound(playerChoice, verbose) {
    // Type guard check!!
    if (!isValidChoice(playerChoice)) {
        alert('Invalid choice!');
        return;
    }
    var difficulty = document.getElementById('difficulty').value;
    // func overloading!! call with or without argument based on difficulty
    var computerChoice = difficulty === 'easy' ? getComputerChoice('easy') : getComputerChoice();
    var result = determineWinner(playerChoice, computerChoice);
    // Optional parameter usage: log to console if verbose is true
    if (verbose) {
        console.log("Round played: Player chose ".concat(playerChoice, ", Computer chose ").concat(computerChoice));
        console.log("Result: ".concat(result));
        console.log("Current stats:", stats);
    }
    // update stats using generic function
    stats = updateStats(stats, result);
    // displays the result
    displayResult(result, playerChoice, computerChoice);
    updateStatsDisplay();
    // Log victory message if verbose and player won
    if (verbose && result === 'win') {
        console.log(getRandomVictoryMessage());
    }
}
function displayResult(result, playerChoice, computerChoice) {
    var gameInfo = document.getElementById('gameInfo');
    if (!gameInfo)
        return;
    var resultText = '';
    var resultClass = '';
    // switch for result display
    // Using generics: get random victory message for wins
    switch (result) {
        case 'win':
            resultText = "".concat(getRandomReactionEmoji(), " ").concat(getRandomVictoryMessage());
            resultClass = 'win';
            break;
        case 'lose':
            resultText = '😞 Computer Wins!';
            resultClass = 'lose';
            break;
        case 'tie':
            resultText = '🤝 It\'s a Tie!';
            resultClass = 'tie';
            break;
    }
    gameInfo.innerHTML = "\n        <div class=\"result ".concat(resultClass, "\">").concat(resultText, "</div>\n        <div class=\"choices-display\">\n            <div>You: ").concat(getEmoji(playerChoice), " ").concat(playerChoice, "</div>\n            <div>Computer: ").concat(getEmoji(computerChoice), " ").concat(computerChoice, "</div>\n        </div>\n    ");
}
function updateStatsDisplay() {
    document.getElementById('wins').textContent = stats.wins.toString();
    document.getElementById('losses').textContent = stats.losses.toString();
    document.getElementById('ties').textContent = stats.ties.toString();
}
function resetGame() {
    stats = { wins: 0, losses: 0, ties: 0 };
    updateStatsDisplay();
    var gameInfo = document.getElementById('gameInfo');
    if (gameInfo) {
        gameInfo.innerHTML =
            '<p style="text-align: center; color: #670;">Choose your weapon to start!</p>';
    }
}
