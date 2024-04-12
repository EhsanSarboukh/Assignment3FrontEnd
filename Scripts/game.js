class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    makeSelection() {
        return prompt(`${this.name}, enter your choice (Rock, Paper, or Scissors):`).toLowerCase();
    }
}

class Game {
    constructor(difficulty) {
        this.player = new Player('Player');
        this.computer = new Player('Computer');
        this.difficulty = difficulty;
    }

    computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
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
        if (this.difficulty === 'hard') {
            rounds = 7; 
        }

        for (let i = 0; i < rounds; i++) {
            this.playerSelection = this.player.makeSelection();
            const computerSelection = this.computerPlay();
            const result = this.playRound(this.playerSelection, computerSelection);
            console.log(result);
        }


        if (this.player.score > this.computer.score) {
            console.log(`Congratulations! You win the game with a score of ${this.player.score}-${this.computer.score}.`);
        } else if (this.player.score < this.computer.score) {
            console.log(`Sorry, you lose the game with a score of ${this.player.score}-${this.computer.score}.`);
        } else {
            console.log(`It's a tie game with a score of ${this.player.score}-${this.computer.score}.`);
        }


        const playAgain = prompt("Do you want to play again? (yes/no)");
        if (playAgain.toLowerCase() === 'yes') {
            this.player.score = 0;
            this.computer.score = 0;
            this.playGame(); 
        } else {
            console.log("Thanks for playing!");
        }
    }
}

const difficulty = prompt("Choose difficulty level (easy, medium, or hard):").toLowerCase();
if (['easy', 'medium', 'hard'].includes(difficulty)) {
    const game = new Game(difficulty);
    game.playGame();
} else {
    console.log("Invalid difficulty level. Please choose from easy, medium, or hard.");
}
