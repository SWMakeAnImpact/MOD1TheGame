// Game Variables 
let currentPlayer;
let Player1Score = 0;
let Player2Score = 0;
let questionNumber = 1
let gameOver = false;


// Choose the starting player randomly function
function chooseStartingPlayer() {
    currentPlayer = Math.random() < 0.5 ? 'Player 1' : 'Player 2';
}


// Gernerate random math question function
function generateQuestion() 
// Array of objects for equations
const equations = [
    {equation: 5 + 5,
    answer: 10},
    {equation}
    
]