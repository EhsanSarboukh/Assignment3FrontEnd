function computerPlay() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();


    if (!['rock', 'paper', 'scissors'].includes(playerSelection)) {
        return 'Invalid selection. Please choose Rock, Paper, or Scissors.';
    }

    if (playerSelection === computerSelection.toLowerCase()) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection.toLowerCase() === 'scissors') ||
        (playerSelection === 'paper' && computerSelection.toLowerCase() === 'rock') ||
        (playerSelection === 'scissors' && computerSelection.toLowerCase() === 'paper')
    ) {
        return `You Win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Enter your choice (Rock, Paper, or Scissors):");
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        
        console.log(result);

        if (result.includes('Win')) {
            playerScore++;
        } else if (result.includes('Lose')) {
            computerScore++;
        }
    }

    if (playerScore > computerScore) {
        console.log(`Congratulations! You win the game with a score of ${playerScore}-${computerScore}.`);
    } else if (playerScore < computerScore) {
        console.log(`Sorry, you lose the game with a score of ${playerScore}-${computerScore}.`);
    } else {
        console.log(`It's a tie game with a score of ${playerScore}-${computerScore}.`);
    }
}

game();
