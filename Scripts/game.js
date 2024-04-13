class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    makeSelection() {
        const selection = prompt(`${this.name}, enter your choice (Rock, Paper, or Scissors):`);
        return selection !== null ? selection.toLowerCase() : null;
    }
}

class Game {
    constructor(difficulty) {
        this.player = new Player('Player');
        this.computer = new Player('Computer');
        this.difficulty = difficulty;
    }

    computerPlay() {
        let computerSelection;
        if (this.difficulty === 'easy') {
            const probabilities = { 'rock': 0.6, 'paper': 0.3, 'scissors': 0.1 };
            computerSelection = this.chooseByProbability(probabilities);
        } else if (this.difficulty === 'medium') {
            const probabilities = { 'rock': 0.4, 'paper': 0.4, 'scissors': 0.2 };
            computerSelection = this.chooseByProbability(probabilities);
        } else if (this.difficulty === 'hard') {
            const winningMoves = { 'rock': 'paper', 'paper': 'scissors', 'scissors': 'rock' };
            computerSelection = winningMoves[this.playerSelection];
        }
        return computerSelection;
    }

    chooseByProbability(probabilities) {
        const random = Math.random();
        let cumulativeProbability = 0;
        for (const [choice, probability] of Object.entries(probabilities)) {
            cumulativeProbability += probability;
            if (random <= cumulativeProbability) {
                return choice;
            }
        }
    }

    playRound(playerSelection, computerSelection) {
        if (playerSelection === null) {
            return 'Game canceled by the player.';
        }

        if (playerSelection === computerSelection) {
            return "It's a tie!";
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            this.player.score++;
            return `You Win! ${playerSelection} beats ${computerSelection}.`;
        } else {
            this.computer.score++;
            return `You Lose! ${computerSelection} beats ${playerSelection}.`;
        }
    }

    playGame() {
        let rounds = 5;
        for (let i = 0; i < rounds; i++) {
            this.playerSelection = this.player.makeSelection();
            if (this.playerSelection === null) {
                alert('Game canceled by the player.');
                return;
            }
            const computerSelection = this.computerPlay();
            const result = this.playRound(this.playerSelection, computerSelection);
            alert(`${result}\nPlayer Score: ${this.player.score}\nComputer Score: ${this.computer.score}`);
        }

        let message;
        if (this.player.score > this.computer.score) {
            message = `Congratulations! You win the game with a score of ${this.player.score}-${this.computer.score}.`;
        } else if (this.player.score < this.computer.score) {
            message = `Sorry, you lose the game with a score of ${this.player.score}-${this.computer.score}.`;
        } else {
            message = `It's a tie game with a score of ${this.player.score}-${this.computer.score}.`;
        }

        alert(message);

        const playAgain = prompt("Do you want to play again? (yes/no)");
        if (playAgain !== null && playAgain.toLowerCase() === 'yes') {
            this.player.score = 0;
            this.computer.score = 0;
            this.playGame();
        } else {
            alert("Thanks for playing!");
        }
    }
}

alert('Welcome to Rock Paper Scissors game!');

const difficulty = prompt("Choose difficulty level (easy, medium, or hard):");

if (difficulty === null) {
    alert('Game canceled by the player.');
} else {
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (validDifficulties.includes(difficulty.toLowerCase())) {
        const game = new Game(difficulty.toLowerCase());
        game.playGame();
    } else {
        alert("Invalid difficulty level. Please choose from easy, medium, or hard.");
    }
}
