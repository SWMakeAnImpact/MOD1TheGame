// Initialize game variables
let currentPlayer;
let player1Score = 0;
let player2Score = 0;
let questionIndex = 0;

// Define the equations for the game
const equations = [
  { equation: '5 + 5', answer: 10 },
  { equation: '8 - 3', answer: 5 },
  { equation: '4 * 6', answer: 24 },
];

// Function to choose the starting player (Random)
function chooseStartingPlayer() {
  currentPlayer = Math.random() < 0.5 ? 'player1' : 'player2';
  document.getElementById(currentPlayer).classList.add('active');
}

// Start a new game
function startGame() {
  questionIndex = 0;
  player1Score = 0;
  player2Score = 0;
  document.getElementById('score1').textContent = player1Score;
  document.getElementById('score2').textContent = player2Score;
  document.getElementById('submit').disabled = false;
  document.getElementById('reset').disabled = false;
  chooseStartingPlayer();
  nextPlayerTurn();
}

// Function to switch to the next player's turn
function nextPlayerTurn() {
  document.getElementById('result').textContent = '';
  document.getElementById('answer').value = '';
  document.getElementById(currentPlayer).classList.remove('active');
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  document.getElementById(currentPlayer).classList.add('active');
  generateQuestion();
}

// Function to generate and display a question
function generateQuestion() {
  if (questionIndex < equations.length) {
    const currentEquation = equations[questionIndex];
    document.getElementById('equation').textContent = `What is ${currentEquation.equation}?`;
  } else {
    endGame();
  }
}

// Event listener for the "Submit" button
document.getElementById('submit').addEventListener('click', function() {
  const answer = parseInt(document.getElementById('answer').value, 10);
  const currentEquation = equations[questionIndex];
  const correctAnswer = currentEquation.answer;

  if (answer === correctAnswer) {
    document.getElementById('result').textContent = 'You guessed it!';
    if (currentPlayer === 'player1') {
      player1Score++;
      document.getElementById('score1').textContent = player1Score;
    } else {
      player2Score++;
      document.getElementById('score2').textContent = player2Score;
    }

    if (player1Score >= 2 || player2Score >= 2) {
      endGame();
    } else {
      questionIndex++;
      generateQuestion();
    }
  } else {
    document.getElementById('result').textContent = 'You missed it! Next player turn';
    nextPlayerTurn();
  }
});

// Event listener for the "Reset" button
document.getElementById('reset').addEventListener('click', function() {
  document.getElementById('submit').disabled = true;
  document.getElementById('reset').disabled = true;
  document.getElementById('result').textContent = '';
  document.getElementById(currentPlayer).classList.remove('active');
  startGame();
});

// Start the initial game when the page loads
startGame();
