// type def
type Choice = 'rock' | 'paper' | 'scissors'; // choices
type Result = 'win' | 'lose' | 'tie'; // results
interface GameStats { wins: number; losses: number; ties: number; } 

let stats: GameStats = { wins: 0, losses: 0, ties: 0 };

// Typescript specific!
// our generic function to get random element from array
// used for choices, victoryQuotes, and emojies
function getRandomElement<T>(array: T[]): T {
    if (array.length === 0) {
        throw new Error('Array cannot be empty');
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex]!;
}

// function overloading --> can call with or without difficulty
function getComputerChoice(): Choice;
function getComputerChoice(difficulty: 'easy'): Choice;
function getComputerChoice(difficulty?: 'easy'): Choice {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    
    // easy mode has predictable pattern
    if (difficulty === 'easy') {
        return 'rock'; // always returns rock ol
    }
    
    return getRandomElement(choices);
}

// type narrowing with type guards
function isValidChoice(input: string): input is Choice {
    return input === 'rock' || input === 'paper' || input === 'scissors';
}

// type narrowing with switch statement
function determineWinner(playerChoice: Choice, computerChoice: Choice): Result {
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

// func overloading: updateStats with multiple signatures
function updateStats(stats: GameStats, result: Result): GameStats;
function updateStats(stats: GameStats, result: Result, increment: number): GameStats;
function updateStats(stats: GameStats, result: Result, increment?: number): GameStats {
    const updated = { ...stats };
    const incrementValue = increment ?? 1; // Default to 1 if not provided
    
    // type narrowing!! narrow the result type to determine which stat to update
    if (isWinResult(result)) {
        updated.wins += incrementValue;
    } else if (isLoseResult(result)) {
        updated.losses += incrementValue;
    } else {
        updated.ties += incrementValue;
    }
    
    return updated;
}

// type narrowing!! type guard functions for Result type
function isWinResult(result: Result): result is 'win' {
    return result === 'win';
}

function isLoseResult(result: Result): result is 'lose' {
    return result === 'lose';
}

function isTieResult(result: Result): result is 'tie' {
    return result === 'tie';
}

function getEmoji(choice: Choice): string {
    switch (choice) {
        case 'rock': return '🪨';
        case 'paper': return '📄';
        case 'scissors': return '✂️';
        default: return '❓';
    }
}

// for gen func
// victory quotes array
const victoryQuotes: string[] = [
    '🎉 Victory is yours!',
    '🏆 You crushed it!',
    '⭐ Amazing play!',
    '🔥 You\'re on fire!',
    '💪 Dominant performance!'
];
// for gen func
// emoji reactions array
const reactionEmojis: string[] = ['🎊', '🎈', '🎁', '🌟', '✨'];

// gen function used for victory messages
function getRandomVictoryMessage(): string {
    return getRandomElement(victoryQuotes);
}

// gen function used for emoji reactions
function getRandomReactionEmoji(): string {
    return getRandomElement(reactionEmojis);
}

// verbose flag for console logging
function playRound(playerChoice: string, verbose?: boolean): void {
    // Type guard check!!
    if (!isValidChoice(playerChoice)) {
        alert('Invalid choice!');
        return;
    }
    
    const difficulty = (document.getElementById('difficulty') as HTMLSelectElement).value;
    // func overloading!! call with or without argument based on difficulty
    const computerChoice = difficulty === 'easy' ? getComputerChoice('easy') : getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    // optional parameter usage! log to console if verbose is true
    if (verbose) {
        console.log(`Round played: Player chose ${playerChoice}, Computer chose ${computerChoice}`);
        console.log(`Result: ${result}`);
        console.log(`Current stats:`, stats);
    }
    
    // update stats using generic function
    stats = updateStats(stats, result);
    
    // displays the result
    displayResult(result, playerChoice, computerChoice);
    updateStatsDisplay();
    
    // display victory message if verbose and player won
    if (verbose && result === 'win') {
        console.log(getRandomVictoryMessage());
    }
}

function displayResult(result: Result, playerChoice: Choice, computerChoice: Choice): void {
    const gameInfo = document.getElementById('gameInfo');
    if (!gameInfo) return;
    
    let resultText = '';
    let resultClass = '';
    
    // switch for result display
    // get random victory message for wins
    switch (result) {
        case 'win':
            resultText = `${getRandomReactionEmoji()} ${getRandomVictoryMessage()}`;
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
    
    gameInfo.innerHTML = `
        <div class="result ${resultClass}">${resultText}</div>
        <div class="choices-display">
            <div>You: ${getEmoji(playerChoice)} ${playerChoice}</div>
            <div>Computer: ${getEmoji(computerChoice)} ${computerChoice}</div>
        </div>
    `;
}

function updateStatsDisplay(): void {
    document.getElementById('wins')!.textContent = stats.wins.toString();
    document.getElementById('losses')!.textContent = stats.losses.toString();
    document.getElementById('ties')!.textContent = stats.ties.toString();
}

function resetGame(): void {
    stats = { wins: 0, losses: 0, ties: 0 };
    updateStatsDisplay();
    const gameInfo = document.getElementById('gameInfo');
    if (gameInfo) {
        gameInfo.innerHTML = 
            '<p style="text-align: center; color: #670;">Choose your weapon to start!</p>';
    }
}